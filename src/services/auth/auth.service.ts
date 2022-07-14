import fetch, { Response } from 'node-fetch';
import { log } from '@root/utils';
import uriConfig from '@root/services/serviceURI';
import { ISession } from '../session/session.service';
const SERVICE_URI = <string>uriConfig.get('USER_SERVICE_URI');

export interface ISignInInput {
	email: string;
	password: string;
}

export interface ISignUpInput {
	knownAs: string;
	fullName: string;
	email: string;
	company: string;
	password: string;
	password_confirmation: string;
}

export default class AuthService {
	async signup({
		knownAs,
		fullName,
		email,
		company,
		password,
		password_confirmation,
	}: {
		knownAs: string;
		fullName: string;
		email: string;
		company: string;
		password: string;
		password_confirmation: string;
	}): Promise<any> {
		try {
			const data: ISignUpInput = {
				knownAs,
				fullName,
				email,
				company,
				password,
				password_confirmation,
			};
			const response: Response = await fetch(`${SERVICE_URI}/auth/signup`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' },
			});
			return await response.json();
		} catch (error) {
			log.error(`[auth.service] - signup ${error.message}`);
			return error;
		}
	}

	static async signin(signInInput: ISignUpInput): Promise<ISession | null> {
		const response = await fetch(`${SERVICE_URI}/auth/login`, {
			method: 'POST',
			body: JSON.stringify({ ...signInInput }),
			headers: { 'Content-Type': 'application/json' },
		});
		const session = <ISession>await response.json();
		if (!session) {
			log.warning(`[AuthService signin] - signin no session`);
			return null;
		}
		return session;
	}

	async signout({ token }: { token: string }): Promise<any> {
		try {
			const data = {
				accessToken: token,
			};
			const response: Response = await fetch(`${SERVICE_URI}/auth/logout`, {
				method: 'DELETE',
				body: JSON.stringify(data),
				headers: { Authorization: 'Bearer ' + token },
			});
			return await response.json();
		} catch (error) {
			log.error(`[auth.service] - signout ${error.message}`);
			return error;
		}
	}
}
