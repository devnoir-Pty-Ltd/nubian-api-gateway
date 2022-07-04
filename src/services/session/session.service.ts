import fetch, { Response } from 'node-fetch';
import { log } from '@root/utils';
import uriConfig from '@root/services/serviceURI';
const SERVICE_URI = <string>uriConfig.get('USER_SERVICE_URI');

type ISession = {
	id: string;
	token: string;
	userId: string;
};
class SessionService {
	async getSession({ sessionId }: { sessionId: string }): Promise<ISession | null> {
		try {
			const response: Response = await fetch(`${SERVICE_URI}/auth/session/${sessionId}`);
			const data: ISession = await response.json();
			return <ISession>data;
		} catch (error) {
			log.error(`[session.service] - getSession ${error.message}`);
			if (error.status === 404) {
				return null;
			}
			return error;
		}
	}
}
export default new SessionService();
