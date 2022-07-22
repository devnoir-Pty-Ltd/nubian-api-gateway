import createError from 'http-errors';
import { IResolverContext } from '@root/graphql/types';
import MessageService from '@root/services/message/message.service';

interface Args {
	messageId: string;
}
const deleteMessageMutation = async (_obj: any, args: Args, context: IResolverContext) => {
	const token: string = context.req.cookies['nubian_token'];
	if (!token) throw new createError.Unauthorized();
	const { messageId } = args;
	await MessageService.deleteMessage({ messageId, token });
	return true;
};

export default deleteMessageMutation;
