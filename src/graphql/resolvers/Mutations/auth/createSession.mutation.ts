import authService from '@root/services/auth/auth.service';
import { IResolverContext } from '@root/graphql/types';
import { ISession } from '@root/services/session/session.service';

const createSession = async (_obj: any, args: any, context: IResolverContext) => {
	const { email, password } = args;
	const session: any = await authService.signin({
		email,
		password,
	});
	if (session.error) return session.error;
	context.res.cookie('nubian_sid', session.id, { httpOnly: true });
	context.res.cookie('nubian_token', session.token, { httpOnly: true });
	return <ISession>session;
};

export default createSession;
