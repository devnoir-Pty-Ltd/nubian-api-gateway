import createError from 'http-errors';
import ChannelService, { IChannel } from '@root/services/channel/channel.service';
import { IResolverContext } from '@root/graphql/types';

const createChannel = async (_obj: any, args: IChannel, context: IResolverContext) => {
	const token: string = context.req.cookies['nubian_token'];
	if (!token) throw new createError.Unauthorized();
	const response = await ChannelService.createItem('channels', { ...args }, token);
	const body = <IChannel>await response;
	return body;
};

export default createChannel;
