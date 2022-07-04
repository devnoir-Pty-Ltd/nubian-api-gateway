import authService from '@root/services/auth/auth.service';
import { IResolverContext, TUser } from '@root/graphql/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signupMutation = async (_obj: any, args: any, _context: IResolverContext) => {
	try {
		const response: TUser = await authService.createItem('auth/signup', {
			...args,
		});
		return response;
	} catch (error) {
		return error;
	}
};

export default signupMutation;
