import config from 'config';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { log } from '@root/utils';
import { schema } from '@root/graphql/schema';
import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';

import gqlFormatErrors from './gqlFormatErrors';
import resolvers from '@root/graphql/resolvers';
import injectCurrentUser from '@root/server/middleware/injectCurrentUser';

const PORT = <number>config.get('PORT') || 8000;
const loggerStream = {
	write: (text: string) => {
		log.info(text);
	},
};
const apolloServer: ApolloServer = new ApolloServer({
	formatError: gqlFormatErrors,
	resolvers,
	typeDefs: schema,
	cache: 'bounded',
	context: async ({ req, res }) => {
		return { req, res };
	},
});
const app: Express = express();
const initServer: () => Promise<void> = async () => {
	app.use(cookieParser());
	app.use(morgan('combined', { stream: loggerStream }));
	app.use(
		cors({
			origin: (origin, cb) => cb(null, true),
			credentials: true,
			exposedHeaders: [
				'Access-Control-Allow-Headers',
				'Access-Control-Allow-Origin: *',
				'Access-Control-Allow-Credentials: true',
				'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept',
				'X-Password-Expired',
			],
		}),
	);

	app.use(injectCurrentUser);

	await apolloServer.start();

	apolloServer.applyMiddleware({ app, cors: false, path: '/graphql' });
	app.listen(PORT, () => {
		log.info(`api-gateway listening on port ${PORT}`);
	});
};

export default initServer;
