import { NextFunction, Request, Response } from 'express';
import sessionService from 'src/services/session/session.service';

const injectCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
	if (req.cookies.userSessionId) {
		const session = await sessionService.getSession({ sessionId: req.cookies.userSessionId });
		res.locals.userSession = session;
	}

	return next();
};

export default injectCurrentUser;
