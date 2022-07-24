import fetch, { Response } from 'node-fetch';
import uriConfig from '@root/services/serviceURI';
const SERVICE_URI = <string>uriConfig.get('MESSAGE_SERVICE_URI');

export interface IChannel {
	accountId: string;
	title: string;
	imageSrc: string;
}

export default class ChannelService {
	static async createItem(path: string, data: any, token?: any | null) {
		const response = await fetch(`${SERVICE_URI}/${path}`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json;charset=UTF-8',
				Authorization: 'Bearer ' + token,
			},
		});
		return await response.json();
	}

	static async fetchData(path: string, token: string) {
		if (!token) return new Error('Unauthorized');
		const response: Response = await fetch(`${SERVICE_URI}/${path}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json;charset=UTF-8',
				Authorization: 'Bearer ' + token,
			},
		});
		return <IChannel[]>await response.json();
	}
	static async updateChannel({ channelId, token }: { channelId: string; token: string }) {
		const response: Response = await fetch(`${SERVICE_URI}/channels/${channelId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
		});
		return response;
	}
	static async deleteChannel({ channelId, token }: { channelId: string; token: string }) {
		const response: Response = await fetch(`${SERVICE_URI}/channels/${channelId}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
		});
		return await response.json();
	}
}
