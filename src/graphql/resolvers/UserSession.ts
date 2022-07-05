import userService from '@root/services/user/user.service';
import { UserSessionType } from '@root/graphql/types';

const UserSession = {
	user: async (session: UserSessionType) => {
		return await userService.fetchUser({ userId: session.userId });
	},
};

export default UserSession;
