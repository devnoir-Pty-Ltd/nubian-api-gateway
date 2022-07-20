import fetch, { Response } from 'node-fetch';
import { log } from '@root/utils';
import uriConfig from '@root/services/serviceURI';
import { ISession } from '../session/session.service';
import { IUser } from '@root/graphql/types';
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
	}): Promise<IUser> {
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
		return <IUser>await response.json();
	}

	static async signin(signInInput: ISignInInput): Promise<ISession | null> {
		const response = await fetch(`${SERVICE_URI}/auth/login`, {
			method: 'POST',
			body: JSON.stringify({ email: signInInput.email, password: signInInput.password }),
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
		const data = {
			accessToken: token,
		};
		const response: Response = await fetch(`${SERVICE_URI}/auth/logout`, {
			method: 'DELETE',
			body: JSON.stringify(data),
			headers: { Authorization: 'Bearer ' + token },
		});
		const body = await response.json();
		return body;
	}
}
