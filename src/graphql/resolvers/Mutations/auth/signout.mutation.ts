import authService from '@root/services/auth/auth.service';
import { IResolverContext } from '@root/graphql/types';

const signupMutation = async (_obj: any, _args: any, context: IResolverContext) => {
	try {
		if (!context.req.cookies['NUBIAN-WEBTOKEB']) throw new Error('Bad Request');
		const response = await authService.signout({
			token: context.req.cookies['NUBIAN-WEBTOKEB'],
		});
		if (response instanceof Error) throw new Error('Unauthorised');

		context.res.clearCookie('NUBIAN-WEBTOKEB');
		context.res.clearCookie('NUBIAN-SJID');

		return true;
	} catch (error) {
		return error;
	}
};

export default signupMutation;
