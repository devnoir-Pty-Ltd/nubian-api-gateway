import fetch, { Response } from 'node-fetch';
import { log } from '@root/utils';
import uriConfig from '@root/services/serviceURI';
const SERVICE_URI = <string>uriConfig.get('MESSAGE_SERVICE_URI');

class MessageService {
	async updateMessage({ id, token }: { id: string; token: string }) {
		try {
			const data = {
				id,
			};
			const response: Response = await fetch(`${SERVICE_URI}/messages/${id}`, {
				method: 'PATCH',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
			});
			return response;
		} catch (error) {
			log.error(`[user.service] - fetchUser ${error.message}`);
			return error;
		}
	}
	async deleteMessage({ id, token }: { id: string; token: string }) {
		try {
			const data = {
				id,
			};
			const response: Response = await fetch(`${SERVICE_URI}/messages/${id}`, {
				method: 'DELETE',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
			});
			return response;
		} catch (error) {
			log.error(`[user.service] - fetchUser ${error.message}`);
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

export default new MessageService();
