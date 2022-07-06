import createError from 'http-errors';
import { IResolverContext } from '@root/graphql/types';
import messageService from '@root/services/message/message.service';

const updateMessageMutation = async (_obj: any, args: any, context: IResolverContext) => {
	try {
		const token: string = context.req.cookies['nubian_token'];
		if (!token) throw new createError.Unauthorized();
		const { data } = await messageService.updateMessage({ ...args, token });
		return data;
	} catch (error) {
		return error;
	}
};

export default updateMessageMutation;
