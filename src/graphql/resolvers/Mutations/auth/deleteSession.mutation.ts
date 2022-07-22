import authService from '@root/services/auth/auth.service';
import { IResolverContext } from '@root/graphql/types';

interface Args {
	me: boolean;
}
const deleteSession = async (_obj: any, args: Args, context: IResolverContext) => {
	if (args.me !== true) throw new Error('Unsupported argument value');

	const sessionId = context.req.cookies['nubian_sid'];

	await authService.signout({
		sessionId,
	});

	context.res.clearCookie('nubian_sid');
	context.res.clearCookie('nubian_token');

	return true;
};

export default deleteSession;
