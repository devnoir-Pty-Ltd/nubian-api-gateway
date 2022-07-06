import createError from 'http-errors';
import { IResolverContext } from '@root/graphql/types';
import messageService from '@root/services/message/message.service';
import userService from '@root/services/user/user.service';

const getmessage = async (_obj: any, args: any, context: IResolverContext) => {
	try {
		const token: string = context.req.cookies['nubian_token'];
		if (!token) throw new createError.Unauthorized();

		let response = await messageService.fetchData(`messages/${args.id}`, token);
		const users: any = await userService.fetchData('users/', token);

		const currentUser = users.find((item: any) => {
			return item.id === context.req.cookies['nubian_sjid'];
		});

		response = response.filter((item: any) => {
			if (Number(item.accountId) === currentUser.accountId) return item;
		});

		response = response.map((item: any) => {
			item['sender'] = users.find((u: any) => u.id === item?.senderId);
			return item;
		});

		return response;
	} catch (error) {
		return error;
	}
};

export default getmessage;
