import createError from 'http-errors';
import MessageService, { IMessage } from '@root/services/message/message.service';
import { IResolverContext } from '@root/graphql/types';

const sendMessage = async (_obj: any, args: IMessage, context: IResolverContext) => {
	const token: string = context.req.cookies['nubian_token'];
	if (!token) throw new createError.Unauthorized();
	const response = await MessageService.createItem('messages', { ...args }, token);
	const body = <IMessage>await response.json();
	return body;
};

export default sendMessage;
