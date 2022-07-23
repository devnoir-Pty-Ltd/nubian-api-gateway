import createError from 'http-errors';
import { IResolverContext } from '@root/graphql/types';
import channelService from '@root/services/channel/channel.service';

interface Args {
	accountId: string;
}
const getChannels = async (_obj: any, args: Args, context: IResolverContext) => {
	const token: string = context.req.cookies['nubian_token'];
	const { accountId } = context.req.body;
	if (!token) return new createError.Unauthorized();
	const response = await channelService.fetchData(`channels`, token, accountId);
	return response;
};

export default getChannels;
