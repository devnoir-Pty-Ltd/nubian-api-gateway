import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export const schema: DocumentNode = gql`
	scalar Date

	type User {
		id: ID
		knownAs: String
		fullName: String
		email: String
		imageSrc: String
		preferences: String
		confirmed: Boolean
		accountId: String
		createdAt: Date
		updatedAt: Date
		account: Account
	}

	type UserSession {
		id: ID
		token: String
		createdAt: Date
		userId: String
		user: User!
	}

	type Account {
		id: ID!
		company: String
		renew_on: Date
	}

	type Mutation {
		createSession(email: String!, password: String!): UserSession!
	}

	type Query {
		userSession(me: Boolean!): UserSession
	}
`;
