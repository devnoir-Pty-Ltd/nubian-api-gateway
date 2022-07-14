import { log } from '@root/utils';
import { NextFunction, Request, Response } from 'express';
import SessionService from '@root/services/session/session.service';
import { UserSessionType } from '@root/graphql/types';

const injectCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
	if (req.cookies.nubian_sid) {
		const session: UserSessionType = await SessionService.getSession(req.cookies.nubian_sid);
		res.locals.userSession = session;
		log.info(`[server middleware] - session injected ${session.id}`);
	}
	return next();
};

export default injectCurrentUser;
