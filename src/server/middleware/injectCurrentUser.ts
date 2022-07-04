import { NextFunction, Request, Response } from 'express';
import SessionService from '@root/services/session/session.service';

const injectCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
	if (req.cookies.sessionId) {
		await SessionService.getSession({ sessionId: req.cookies.sessionId });
	}
	return next();
};

export default injectCurrentUser;
