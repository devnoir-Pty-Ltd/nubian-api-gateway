import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export const schema: DocumentNode = gql`
	scalar Date

	type User {
		id: String
		knownAs: String
		fullName: String
		email: String
		confirmed: Boolean
		accountId: String
		createdAt: Date
		updatedAt: Date
	}

	type UserSession {
		id: ID!
		token: String!
		createdAt: Date!
		userId: String!
		user: User!
	}

	type Mutation {
		createSession(email: String!, password: String!): UserSession!
	}

	type Query {
		userSession(me: Boolean!): UserSession
	}
`;
