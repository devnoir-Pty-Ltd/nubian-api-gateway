import { NextFunction, Request, Response } from 'express';
import SessionService from '@root/services/session/session.service';

const injectCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
	console.log('new sesson', req.cookies);
	if (req.cookies.nubian_sjid) {
		const session = await SessionService.getSession({ sessionId: req.cookies.nubian_sjid });
		res.locals.userSession = session;
	}
	return next();
};

export default injectCurrentUser;
