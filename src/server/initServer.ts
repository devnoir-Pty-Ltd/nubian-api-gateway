import * as config from 'config';
import * as morgan from 'morgan';
import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

import { log } from '@root/utils';
import { schema } from '@root/graphql/schema';
import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';

import gqlFormatErrors from './middleware/gqlFormatErrors';
import resolvers from '@root/graphql/resolvers';

const initServer: () => Promise<void> = async () => {
	const PORT = <number>config.get('PORT') || 7001;
	const app: Express = express();

	const apolloServer: ApolloServer = new ApolloServer({
		context: (a) => a,
		csrfPrevention: true,
		formatError: gqlFormatErrors,
		resolvers,
		typeDefs: schema,
	});

	const loggerStream = {
		write: (text: string) => {
			log.info(text);
		},
	};
	app.use(morgan('combined', { stream: loggerStream }));
	app.use(cookieParser());
	app.use(
		cors({
			origin: (_, callback) => callback(null, true),
			credentials: true,
			preflightContinue: true,
			exposedHeaders: [
				'Access-Control-Allow-Headers',
				'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept',
				'X-Password-Expired',
			],
			optionsSuccessStatus: 200,
		}),
	);
	await apolloServer.start();
	apolloServer.applyMiddleware({ app, cors: false, path: '/graphql' });

	app.listen(PORT, () => {
		log.info(`api-gateway listening on port ${PORT}`);
	});
};

export default initServer;
