import createError from 'http-errors';
import { IResolverContext } from '@root/graphql/types';
import channelService from '@root/services/channel/channel.service';
interface Args {
	channelId: string;
}
const updateChannelMutation = async (_obj: any, args: Args, context: IResolverContext) => {
	try {
		const token: string = context.req.cookies['nubian_token'];
		if (!token) throw new createError.Unauthorized();
		const response = await channelService.updateChannel({ ...args, token });
		return response;
	} catch (error) {
		return error;
	}
};

export default updateChannelMutation;
