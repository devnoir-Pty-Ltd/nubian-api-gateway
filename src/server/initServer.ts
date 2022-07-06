import config from 'config';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { log } from '@root/utils';
import { schema } from '@root/graphql/schema';
import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginInlineTrace } from 'apollo-server-core';

import gqlFormatErrors from './gqlFormatErrors';
import resolvers from '@root/graphql/resolvers';
import injectCurrentUser from '@root/server/middleware/injectCurrentUser';

const initServer: () => Promise<void> = async () => {
	const PORT = <number>config.get('PORT') || 8000;
	const app: Express = express();

	const apolloServer: ApolloServer = new ApolloServer({
		context: (a) => a,
		formatError: gqlFormatErrors,
		resolvers,
		typeDefs: schema,
		plugins: [ApolloServerPluginInlineTrace()],
	});

	const corsOptions = {
		origin: ['https://studio.apollographql.com'],
		credentials: true,
	};

	const loggerStream = {
		write: (text: string) => {
			log.info(text);
		},
	};
	app.use(morgan('combined', { stream: loggerStream }));
	app.use(cookieParser());
	app.use(
		cors({
			origin: (origin, callback) => callback(null, true),
			credentials: true,
			preflightContinue: true,
			exposedHeaders: [
				'Access-Control-Allow-Headers',
				'Access-Control-Allow-Origin: *',
				'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept',
				'X-Password-Expired',
			],
			optionsSuccessStatus: 200,
		}),
	);

	app.use(injectCurrentUser);
	await apolloServer.start();
	apolloServer.applyMiddleware({ app, cors: corsOptions, path: '/graphql' });

	app.listen(PORT, () => {
		log.info(`api-gateway listening on port ${PORT}`);
	});
};

export default initServer;
