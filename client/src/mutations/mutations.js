import { gql } from 'apollo-boost';

const AddQuestion = gql`
	mutation(
		$userId: ID!
		$questionTitle: String!
		$questionContent: String!
		$category: String
		$bounty: Int!
		$restriction: Int!
		$tags: [String]
	) {
		addQuestion(
			userId: $userId
			questionTitle: $questionTitle
			questionContent: $questionContent
			category: $category
			bounty: $bounty
			restriction: $restriction
			tags: $tags
		) {
			id
		}
	}
`;

const AddAnswer = gql`
	mutation(
		$userId: ID!, 
		$questionId: ID!, 
		$answer: String!) {
		addAnswer(
			userId: $userId, 
			questionId: $questionId, 
			answer: $answer) {
			id
		}
	}
`;

const AddUser = gql`
	mutation(
		$username: String!,
		$email: String!,
		) {
		addUser(
			username: $username,
			email: $email,
			) {
			id
			username
			rank
			credit
		}
	}
`;

const AddTransaction = gql`
	mutation(
		$questionId: ID!,
		$senderId: ID!,
		$receiverId: ID!,
		$amount: Int!,
	) {
		AddTransaction(
			questionId: $questionId,
			senderId: $senderId,
			receiverId: $receiverId,
			amount: $amountId
		) {
			id
		}
	}
`;

const UpdateCredit = gql`
  mutation(
		$id: Int,
		$credit: Int,
	) {
		UpdateCredit(
			id: $id,
			credit: $credit
		) 
	}
`

module.exports = { AddQuestion, AddAnswer, AddUser, AddTransaction, UpdateCredit };
