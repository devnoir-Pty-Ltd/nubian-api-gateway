import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export const schema: DocumentNode = gql`
	scalar Date
	scalar Blob

	type User {
		id: ID
		knownAs: String
		fullName: String
		email: String
		imageSrc: Blob
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

	type Message {
		id: ID!
		senderId: String
		senderType: String
		receiverType: String
		receiverId: String
		text: String
		imageSrc: String
	}

	type Mutation {
		createSession(email: String!, password: String!): UserSession!
		deleteSession(me: Boolean!): Boolean!

		sendMessage(
			senderId: String!
			senderType: String!
			receiverType: String!
			receiverId: String!
			text: String
			imageSrc: String
		): Message!

		deleteMessage(messageId: String!): Boolean!
	}

	type Query {
		userSession(me: Boolean!): UserSession
	}
`;
