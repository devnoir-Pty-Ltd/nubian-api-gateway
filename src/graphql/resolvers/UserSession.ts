import { UserSessionType } from '@root/graphql/types';
import UserService from '@root/services/user/user.service';

const UserSession = {
	user: async (userSession: UserSessionType) => {
		return await UserService.fetchUser(userSession.userId, userSession.token);
	},
};

export default UserSession;
