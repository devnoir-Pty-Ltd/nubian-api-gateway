import { log } from '@root/utils';
import { ISignInInput } from '@root/services/auth/auth.service';
import { IResolverContext } from '@root/graphql/types';
import authService from '@root/services/auth/auth.service';
import { ISession } from '@root/services/session/session.service';

const signinMutation = async (_obj: any, { email, password }: ISignInInput, context: IResolverContext) => {
	try {
		const session: ISession = await authService.signin({ email, password });
		if (session instanceof Error) {
			return session;
		}
		context.res.cookie('nubian_sjid', session.id, { httpOnly: true, secure: true });
		context.res.cookie('nubian_token', session.token, { httpOnly: true, secure: true });
		return <ISession>session;
	} catch (error) {
		log.error('[signinMutation]', error);
		return error;
	}
};

export default signinMutation;
