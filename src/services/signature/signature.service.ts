import fetch, { Response } from 'node-fetch';
import uriConfig from '@root/services/serviceURI';
const SERVICE_URI = <string>uriConfig.get('MESSAGE_SERVICE_URI');
export interface ISignature {
	url: string;
}
export default class SignatureService {
	static async fetchData(path: string, token: string) {
		if (!token) return new Error('Unauthorized');
		const response: Response = await fetch(`${SERVICE_URI}/${path}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json;charset=UTF-8',
				Authorization: 'Bearer ' + token,
			},
		});
		return <ISignature>await response.json();
	}
}
