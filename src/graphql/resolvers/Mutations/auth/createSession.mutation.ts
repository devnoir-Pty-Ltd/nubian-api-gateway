import authService from '@root/services/auth/auth.service';
import { IResolverContext, UserSessionType } from '@root/graphql/types';

const createSession = async (_obj: any, args: any, context: IResolverContext) => {
	const { email, password } = args;
	const session: any = await authService.signin({
		email,
		password,
	});
	if (session.error) return session.error;
	context.res.cookie('nubian_sid', session.id, { httpOnly: true });
	context.res.cookie('nubian_token', session.token, { httpOnly: true });
	context.res.cookie('nubian_aid', session.user.accountId, { httpOnly: true });
	return <UserSessionType>session;
};

export default createSession;
