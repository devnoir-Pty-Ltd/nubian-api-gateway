import { log } from '@root/utils';
import { IResolverContext } from '@root/graphql/types';

interface Args {
	me: boolean;
}

const userSession = async (obj: any, args: Args, context: IResolverContext) => {
	if (args.me !== true) throw new Error('Unsupported argument value');
	log.info('[signedIn gql query] session injected');
	return context.res.locals.userSession;
};

export default userSession;
