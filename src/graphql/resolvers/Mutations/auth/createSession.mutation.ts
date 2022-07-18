import { ISession } from './../../../../services/session/session.service';
import authService from '@root/services/auth/auth.service';
import { IResolverContext } from '@root/graphql/types';

const createSession = async (_obj: any, args: any, context: IResolverContext) => {
	const { email, password } = args;
	const session: ISession = await authService.signin({
		email,
		password,
	});
	console.log('this is the session', session);
	context.res.cookie('nubian_sid', session.id, { httpOnly: true });
	return <ISession>session;
};

export default createSession;
