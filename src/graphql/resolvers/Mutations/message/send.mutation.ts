import createError from 'http-errors';
import messageService from '@root/services/message/message.service';
import { IResolverContext } from '@root/graphql/types';

const sendMessageMutation = async (_obj: any, args: any, context: IResolverContext) => {
	try {
		const token: string = context.req.cookies['NUBIAN-WEBTOKEB'];
		if (!token) throw new createError.Unauthorized();
		const { data } = await messageService.createItem('messages', { ...args }, token);
		return data;
	} catch (error) {
		return error;
	}
};

export default sendMessageMutation;
