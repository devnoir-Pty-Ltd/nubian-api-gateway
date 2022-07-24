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

	type Message {
		_id: ID!
		channelId: String
		senderId: String
		senderType: String
		receiverType: String
		receiverId: String
		text: String
		imageSrc: String
	}

	type Channel {
		_id: ID
		accountId: String
		title: String
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

		createChannel(accountId: String!, title: String!, imageSrc: String): Channel!
		updateChannel(channelId: String!): Channel!
		deleteChannel(channelId: String!): Boolean!
	}

	type Query {
		userSession(me: Boolean!): UserSession
		getChannels(accountId: String!): [Channel!]!
	}
`;
