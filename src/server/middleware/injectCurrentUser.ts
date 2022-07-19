import { log } from '@root/utils';
import { NextFunction, Request, Response } from 'express';
import SessionService from '@root/services/session/session.service';
import { UserSessionType } from '@root/graphql/types';

const injectCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
	if (req.cookies.nubian_sid) {
		const session = await SessionService.getSession(req.cookies.nubian_sid);
		if (session.error) {
			return next(session.error);
		}
		res.locals.userSession = <UserSessionType>session;
		log.info(`[server middleware] - session injected`);
	}
	return next();
};

export default injectCurrentUser;
