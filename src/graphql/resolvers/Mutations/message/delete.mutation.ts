import createError from 'http-errors';
import { IResolverContext } from '@root/graphql/types';
import messageService from '@root/services/message/message.service';

const deleteMessageMutation = async (_obj: any, args: any, context: IResolverContext) => {
	try {
		const token: string = context.req.cookies['nubian_token'];
		if (!token) throw new createError.Unauthorized();
		await messageService.deleteMessage({ ...args, token });
		return true;
	} catch (error) {
		return error;
	}
};

export default deleteMessageMutation;
