import { log } from '@root/utils';
import { NextFunction, Request, Response } from 'express';
import SessionService from '@root/services/session/session.service';

const injectCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
	if (req.cookies.nubain_sjid) {
		log.info('[server middleware] - session injected');
		const session = await SessionService.getSession({ sessionId: req.cookies.nubian_sjid });
		res.locals.userSession = session;
	}
	return next();
};

export default injectCurrentUser;
