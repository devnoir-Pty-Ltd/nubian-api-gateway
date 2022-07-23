import createError from 'http-errors';
import ChannelService from '@root/services/channel/channel.service';
import { IResolverContext } from '@root/graphql/types';
interface Args {
	channelId: string;
}
const deleteChannelMutation = async (_obj: any, args: Args, context: IResolverContext) => {
	const token: string = context.req.cookies['nubian_token'];
	if (!token) throw new createError.Unauthorized();
	const { channelId } = args;
	await ChannelService.deleteChannel({ channelId, token });
	return true;
};

export default deleteChannelMutation;
