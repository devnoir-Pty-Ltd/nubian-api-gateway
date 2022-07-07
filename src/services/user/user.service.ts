import fetch, { Response } from 'node-fetch';
import { log } from '@root/utils';
import uriConfig from '@root/services/serviceURI';
import { TUser } from '@root/graphql/types';
const SERVICE_URI = <string>uriConfig.get('USER_SERVICE_URI');

class UserService {
	fetchUser: ({ userId }: { userId: string }) => Promise<any> = async ({ userId }) => {
		try {
			const data = {
				userId,
			};
			const response: Response = await fetch(`${SERVICE_URI}/users/${userId}`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' },
			});
			return response;
		} catch (error) {
			log.error(`[user.service] - fetchUser ${error.message}`);
			return error;
		}
	};
	async fetchData({ path, token }: { path: string; token: string }): Promise<any | Error> {
		try {
			if (!token) return new Error('Unauthorized');
			const response: Response = await fetch(`${SERVICE_URI}/${path}`, {
				method: 'GET',
				headers: {
					'content-type': 'application/json;charset=UTF-8',
					Authorization: 'Bearer ' + token,
				},
			});
			const data: TUser = await response.json();
			return data;
		} catch (error) {
			log.error(`[user.service] - fetchData ${error.message}`);
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
			log.error(`[user.service] - createItem ${error.message}`);
			return error;
		}
	}
}

export default new UserService();
