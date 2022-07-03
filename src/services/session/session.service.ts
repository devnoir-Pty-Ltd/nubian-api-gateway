import BaseService from 'src/services/base.service';

type ISession = {
	id: string;
	token: string;
	userId: string;
};
class SessionService extends BaseService {
	constructor(SERVICE_URI: string) {
		super(SERVICE_URI);
	}
	getSession: ({ sessionId }: { sessionId: string }) => Promise<ISession | null> = async ({ sessionId }) => {
		const response = await this.got
			.get(`${this.SERVICE_URI}/auth/session/${sessionId}`)
			.json()
			.catch((err) => {
				if (err.response.statusCode === 404) return null;
				throw err;
			});
		if (!response) return null;
		return <ISession | null>response;
	};
}
export default new SessionService('USER_SERVICE_URI');
