import fetch, { Response } from 'node-fetch';
import { log } from '@root/utils';
import uriConfig from '@root/services/serviceURI';
import { IAccount } from '@root/graphql/types';
const SERVICE_URI = <string>uriConfig.get('USER_SERVICE_URI');

export interface IUser {
	accountId: string;
	confirmed: boolean;
	createdAt: string;
	email: string;
	fullName: string;
	knownAs: string;
	id: string;
	account?: IAccount;
}

export default class UserService {
	static async fetchUser(userId: string, token: string): Promise<IUser | Error> {
		const body: Response = await fetch(`${SERVICE_URI}/users/${userId}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
		});
		const response = await body.json().catch((err) => {
			if (err.statusCode === 404) return null;
			log.info(`[UserService user.service] - fetchUser not found`);
			throw err;
		});
		log.info(`[UserService user.service] - fetchUser user found`);
		return <IUser>response;
	}
}
