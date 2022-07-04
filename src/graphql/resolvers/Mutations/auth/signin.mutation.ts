import { ISignInInput } from '@root/services/auth/auth.service';
import { IResolverContext } from '@root/graphql/types';
import authService from '@root/services/auth/auth.service';
import { ISession } from '@root/services/session/session.service';

const signinMutation = async (_obj: any, { email, password }: ISignInInput, context: IResolverContext) => {
	try {
		const session: ISession | Error = await authService.signin({ email, password });
		if (session instanceof Error) {
			return session;
		}

		context.res.cookie('NUBIAN-WEBTOKEB', session.token, { httpOnly: true, secure: true });
		context.res.cookie('NUBIAN-SJID', session.id, { httpOnly: true, secure: true });

		return <ISession>session;
	} catch (error) {
		return error;
	}
};

export default signinMutation;
