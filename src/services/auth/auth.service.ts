import fetch, { Response } from 'node-fetch';
import { log } from '@root/utils';
import uriConfig from '@root/services/serviceURI';
const SERVICE_URI = <string>uriConfig.get('USER_SERVICE_URI');

type ISignInInput = {
	email: string;
	password: string;
};

type ISignUpInput = {
	knownAs: string;
	fullName: string;
	email: string;
	company: string;
	password: string;
	password_confirmation: string;
};

class AuthService {
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

	async signin({ email, password }: { email: string; password: string }): Promise<any> {
		try {
			const data: ISignInInput = {
				email,
				password,
			};
			const response: Response = await fetch(`${SERVICE_URI}/auth/login`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' },
			});
			return await response.json();
		} catch (error) {
			log.error(`[auth.service] - signin ${error.message}`);
			return error;
		}
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

export default new AuthService();
