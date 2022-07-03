import BaseService from 'src/services/base.service';

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

class AuthService extends BaseService {
	constructor(SERVICE_URI: string) {
		super(SERVICE_URI);
	}

	signup: ({
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
	}) => Promise<any> = async ({ knownAs, fullName, email, company, password, password_confirmation }: ISignUpInput) => {
		try {
			const response = await this.got
				.post(`${this.SERVICE_URI}/auth/signup`, {
					json: {
						knownAs,
						fullName,
						email,
						company,
						password,
						password_confirmation,
					},
				})
				.json();
			return response;
		} catch (error) {
			return error;
		}
	};

	signin: ({ email, password }: { email: string; password: string }) => Promise<any> = async ({
		email,
		password,
	}: ISignInInput) => {
		try {
			const response = await this.got
				.post(`${this.SERVICE_URI}/auth/login`, {
					json: { email, password },
				})
				.json();
			return response;
		} catch (error) {
			return error;
		}
	};

	signout: ({ token }: { token: string }) => Promise<any> = async ({ token }) => {
		try {
			const response = await this.got.post(`${this.SERVICE_URI}/auth/logout`, {
				json: { accessToken: token },
				headers: { Authorization: 'Bearer ' + token },
			});
			return response;
		} catch (error) {
			return error;
		}
	};
}

export default new AuthService('USER_SERVICE_URI');
