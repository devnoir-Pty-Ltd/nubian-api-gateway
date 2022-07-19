import { Request, Response } from 'express';

import { ISession } from '@root/services/session/session.service';

export interface IResolverContext {
	req: Request;
	res: Response;
}

export interface IUser {
	id: string;
	knownAs: string;
	fullName: string;
	email: string;
	imageSrc: Blob;
	accountId: string;
	confirmed: boolean;
	createdAt: string;
	account?: IAccount;
}
export interface IAccount {
	id: number;
	ownerId: string;
	company: string;
	createdAt: string;
	updatedAt: string;
	renew_on: Date;
}

// export type UserSessionType = ISession & { user: TUser };
export type UserSessionType = ISession & { user: IUser };
