import fetch, { Response } from 'node-fetch';
import uriConfig from '@root/services/serviceURI';
const SERVICE_URI = <string>uriConfig.get('MESSAGE_SERVICE_URI');

export interface IMessage {
	senderId: string;
	senderType: string;
	receiverType: string;
	receiverId: string;
	text: string;
	imageSrc: string;
}

export default class MessageService {
	static async fetchData(path: string, token: string) {
		if (!token) return new Error('Unauthorized');
		const response: Response = await fetch(`${SERVICE_URI}/${path}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json;charset=UTF-8',
				Authorization: 'Bearer ' + token,
			},
		});
		return <IMessage[]>await response.json();
	}
	static async createItem(path: string, data: IMessage, token?: any | null) {
		const response = await fetch(`${SERVICE_URI}/${path}`, {
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json;charset=UTF-8',
				Authorization: 'Bearer ' + token,
			},
		});
		return await response.json();
	}
	static async updateMessage({ messageId, token }: { messageId: string; token: string }) {
		const response: Response = await fetch(`${SERVICE_URI}/messages/${messageId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
		});
		return response;
	}
	static async deleteMessage({ messageId, token }: { messageId: string; token: string }) {
		const response: Response = await fetch(`${SERVICE_URI}/messages/${messageId}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
		});
		return await response.json();
	}
}
