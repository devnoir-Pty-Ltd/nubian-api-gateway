import { Request, Response } from 'express';

import { ISession } from '@root/services/session/session.service';

export type IResolverContext = {
	req: Request;
	res: Response;
};

export type TUser = {
	id: string;
	knownAs: string;
	fullName: string;
	email: string;
	passwordHash: string;
	accountId: number;
	Account?: TAccount;
	confirmed: boolean;
	createdAt: string;
	updatedAt: string;
};
export type TAccount = {
	id: number;
	ownerId: string;
	company: string;
	createdAt: string;
	updatedAt: string;
	renew_on: Date;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type UserSessionType = ISession & { user: TUser };
