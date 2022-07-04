import { IResolverContext } from '@root/graphql/types';
type Args = {
	me: boolean;
};

const signedIn = async (obj: any, args: Args, context: IResolverContext) => {
	if (args.me !== true) throw new Error('Unsupported argument value');
	return context.res.locals.userSession;
};

export default signedIn;
