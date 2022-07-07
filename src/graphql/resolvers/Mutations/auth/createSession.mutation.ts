import { ISession } from './../../../../services/session/session.service';
import authService from '@root/services/auth/auth.service';
import { IResolverContext } from '@root/graphql/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createSession = async (_obj: any, args: any, context: IResolverContext) => {
	try {
		const session: ISession = await authService.signin({
			...args,
		});
		context.res.cookie('nubain_sjid', session.id);
		context.res.cookie('nubain_token', session.token);

		return session;
	} catch (error) {
		return error;
	}
};

export default createSession;
