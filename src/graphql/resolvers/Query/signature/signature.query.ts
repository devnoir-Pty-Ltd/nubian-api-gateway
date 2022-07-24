import createError from 'http-errors';
import { IResolverContext } from '@root/graphql/types';
import SignatureService, { ISignature } from '@root/services/signature/signature.service';

interface Args {
	me: boolean;
}
const getUrl = async (_obj: any, args: Args, context: IResolverContext) => {
	if (args.me !== true) throw new Error('Unsupported argument value');
	const token: string = context.req.cookies['nubian_token'];
	if (!token) return new createError.Unauthorized();
	const response: ISignature | unknown = await SignatureService.fetchData(`signature`, token);
	return response;
};

export default getUrl;
