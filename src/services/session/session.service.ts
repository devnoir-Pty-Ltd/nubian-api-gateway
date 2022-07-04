import fetch, { Response } from 'node-fetch';
import { log } from '@root/utils';
import uriConfig from '@root/services/serviceURI';
import { TUser } from '@root/graphql/types';
const SERVICE_URI = <string>uriConfig.get('USER_SERVICE_URI');

export type ISession = {
	id: string;
	token: string;
	userId: string;
	user?: TUser;
};
class SessionService {
	async getSession({ sessionId }: { sessionId: string }): Promise<ISession | null> {
		try {
			const response: Response = await fetch(`${SERVICE_URI}/auth/session/${sessionId}`);
			const data: ISession = await response.json();
			return <ISession>data;
		} catch (error) {
			log.error(`[session.service] - getSession ${error.message}`);
			if (error.status === 404) {
				return null;
			}
			return error;
		}
	}
	async fetchData(path: string, token: string) {
		try {
			if (!token) return new Error('Unauthorized');
			const response: Response = await fetch(`${SERVICE_URI}/${path}`, {
				method: 'GET',
				headers: {
					'content-type': 'application/json;charset=UTF-8',
					Authorization: 'Bearer ' + token,
				},
			});
			return await response.json();
		} catch (error) {
			log.error(`[session.service] - fetchData ${error.message}`);
			return error;
		}
	}

	async createItem(path: string, data: any, token?: any | null) {
		try {
			const response = await fetch(`${SERVICE_URI}/${path}`, {
				body: data,
				headers: {
					'content-type': 'application/json;charset=UTF-8',
					Authorization: 'Bearer ' + token,
				},
			});
			return await response.json();
		} catch (error) {
			log.error(`[session.service] - createItem ${error.message}`);
			return error;
		}
	}
}
export default new SessionService();
