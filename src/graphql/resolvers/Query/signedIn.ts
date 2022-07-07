import { log } from '@root/utils';
import sessionService, { ISession } from '@root/services/session/session.service';
import { IResolverContext } from '@root/graphql/types';

type Args = {
	me: boolean;
};

const signedIn = async (obj: any, args: Args, context: IResolverContext) => {
	try {
		if (args.me !== true) throw new Error('Unsupported argument value');
		const sessionId = context.req.cookies.nubain_sjid;
		const session: ISession = await sessionService.getSession({ sessionId });
		if (!session) throw new Error('Session not found');
		return <ISession>session;
	} catch (error) {
		error.status = 401;
		log.error('[signedIn gql query]', error);
		return error;
	}
};

export default signedIn;
