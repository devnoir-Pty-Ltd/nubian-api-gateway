import authService from '@root/services/auth/auth.service';
import { IResolverContext } from '@root/graphql/types';

const signupMutation = async (_obj: any, _args: any, context: IResolverContext) => {
	try {
		if (!context.req.cookies['nubian_token']) throw new Error('Bad Request');
		const response = await authService.signout({
			token: context.req.cookies['nubian_token'],
		});
		if (response instanceof Error) throw new Error('Unauthorised');

		context.res.clearCookie('nubian_token');
		context.res.clearCookie('nubian_sjid');

		return true;
	} catch (error) {
		return error;
	}
};

export default signupMutation;
