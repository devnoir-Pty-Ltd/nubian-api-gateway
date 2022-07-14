import fetch, { Response } from 'node-fetch';
import { log } from '@root/utils';
import uriConfig from '@root/services/serviceURI';
const SERVICE_URI = <string>uriConfig.get('USER_SERVICE_URI');

export interface IUser {
	accountId: string;
	confirmed: boolean;
	createdAt: string;
	email: string;
	fullName: string;
	knownAs: string;
	id: string;
}

export default class UserService {
	static async fetchUser(userId: string, token: string): Promise<IUser | null> {
		const response: Response = await fetch(`${SERVICE_URI}/users/${userId}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
		});
		const user: IUser = await response.json().catch((err) => {
			if (err.response.statusCode === 404) return null;
			throw err;
		});
		log.info(`[UserService user.service] - fetchUser user found`);
		return <IUser>user;
	}
}
