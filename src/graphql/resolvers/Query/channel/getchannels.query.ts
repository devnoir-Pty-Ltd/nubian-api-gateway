import createError from 'http-errors';
import { IResolverContext } from '@root/graphql/types';
import channelService from '@root/services/channel/channel.service';

const getChannels = async (_obj: any, args: any, context: IResolverContext) => {
	const token: string = context.req.cookies['nubian_token'];
	const accountId: string = context.req.cookies['nubian_aid'];
	if (!token) return new createError.Unauthorized();
	const response = await channelService.fetchData(`channels`, token, accountId);
	return response;
};

export default getChannels;
