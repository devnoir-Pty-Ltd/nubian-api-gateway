import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export const schema: DocumentNode = gql`
	scalar Date

	type User {
		id: ID!
		knowAs: String!
		fullName: String!
		email: String!
		password: String!
		createdAt: Date!
		updatedAt: Date!
		accountId: String!
		account: Account!
		preferences: String!
	}

	type Account {
		id: ID!
		userId: String!
		company: String!
		createdAt: Date!
		updatedAt: Date!
		renew_on: Date!
	}

	type Session {
		id: ID!
		token: String!
		createdAt: Date!
		userId: String!
		user: User!
	}

	type Query {
		signedIn(me: Boolean!): Session
	}
`;
