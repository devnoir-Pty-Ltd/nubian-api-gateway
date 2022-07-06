import { log } from '@root/utils';
import userService from '@root/services/user/user.service';
import sessionService, { ISession } from '@root/services/session/session.service';
import { IResolverContext, TUser } from '@root/graphql/types';

type Args = {
	me: boolean;
};

const signedIn = async (obj: any, args: Args, context: IResolverContext) => {
	try {
		if (args.me !== true) throw new Error('Unsupported argument value');
		const sessionId = context.req.cookies['nubain_sjid'];
		const token = context.req.cookies['nubain_token'];
		const session: ISession = await sessionService.fetchData(`auth/session/${sessionId}`, token);

		if (!session) throw new Error('Session not found');
		const user: TUser = await userService.fetchData(`users/${session.userId}`, token);

		if (!user) throw new Error('User not found');
		session.user = user;

		return <ISession>session;
	} catch (error) {
		error.status = 401;
		log.error('[signedIn gql query]', error);
		return error;
	}
};

export default signedIn;
