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
		user: User
	}

	type Message {
		_id: ID!
		senderId: String!
		senderType: String!
		receiverType: String!
		receiverId: String!
		text: String!
		imageSrc: String
		createdAt: Date!
		updatedAt: Date
		sender: User
	}

	type Mutation {
		signin(email: String!, password: String!): Session!

		signup(
			knownAs: String!
			fullName: String!
			email: String!
			password: String!
			password_confirmation: String!
			company: String!
		): User!

		signout: Boolean!

		updatemessage(
			id: String!
			senderId: String!
			senderType: String!
			receiverType: String!
			receiverId: String!
			text: String!
			imageSrc: String
		): Message!
		deleteMessage(id: String!): Boolean!

		sendmessage(
			senderId: String!
			senderType: String!
			receiverType: String!
			receiverId: String!
			text: String!
			imageSrc: String
		): Message
	}

	type Query {
		fetchUsers: [User!]!
		signedIn(me: Boolean!): Session
		getmessage(id: String!): Message
		getmessages: [Message!]!
	}
`;
