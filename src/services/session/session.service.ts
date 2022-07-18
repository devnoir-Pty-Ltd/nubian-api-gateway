import fetch, { Response } from 'node-fetch';
import { log } from '@root/utils';
import uriConfig from '@root/services/serviceURI';
import { IUser } from '@root/graphql/types';
const SERVICE_URI = <string>uriConfig.get('USER_SERVICE_URI');

export interface ISession {
	id: string;
	token: string;
	userId: string;
	user: IUser;
}

export default class SessionService {
	static async getSession(sessionId: string): Promise<ISession | any> {
		const response: Response = await fetch(`${SERVICE_URI}/auth/sessions/${sessionId}`);
		const session: ISession = await response.json().catch((err) => {
			if (err.statusCode === 404) return null;
			throw err;
		});
		log.info(`[sessionService - getSession]  session available ${sessionId}`);
		return <ISession>session;
	}
}
