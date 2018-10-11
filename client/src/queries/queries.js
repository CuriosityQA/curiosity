import { gql } from 'apollo-boost';

const getUser = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      username
      rank
      credit
      email
      createdAt
      questions {
        id
        questionTitle
        bounty
      }
      answers {
        id
        answer
        score
        question {
          id
          questionTitle
        }
      }
      transactions {
        id
        questionId
        amount
        receiverId
        recipient {
          username
        }
        sender {
          username
        }
        questionName {
          questionTitle
        }
      }
    }
  }
`;

const getQuestion = gql`
  query($id: ID!) {
    question(id: $id) {
      id
      questionTitle
      questionContent
      category
      bounty
      bountyPaid
      restriction
      tags
      score
      ratedUpBy
      ratedDownBy
      user {
        id
        username
        rank
      }
      answers {
        id
        answerChosen
      }
      createdAt
    }
  }
`;

// passing in the questionId
const getAnswer = gql`
  query($id: ID!) {
    answer(id: $id) {
      id
      answer
      score
      createdAt
      ratedUpBy
      ratedDownBy
      answerChosen
      user {
        id
        username
        rank
      }
      question {
        id
        questionTitle
      }
    }
  }
`;

const getQuestions = gql`
  query($limit: Int!, $skip: Int!, $filter: String) {
    questions(limit: $limit, skip: $skip, filter: $filter) {
      id
    }
  }
`;

const checkUserEmail = gql`
  query($email: String!) {
    checkUserEmail(email: $email) {
      id
      username
      email
      rank
      credit
      messages {
        unread
      }
      questions {
        id
        questionTitle
        answers {
          id
          answer
          createdAt
          question {
            id
            questionTitle
          }
          user {
            username
          }
          questionerSeen
        }
      }
    }
  }
`;
const checkUsername = gql`
  query($username: String!) {
    checkUsername(username: $username) {
      id
      username
    }
  }
`;

const searchQuestion = gql`
  query($term: String) {
    searchQuestion(term: $term) {
      id
      category
      questionTitle
      questionContent
      user {
        id
        username
      }
      bounty
      restriction
      tags
      createdAt
      answers {
        id
      }
    }
  }
`;

const getMessages = gql`
  query($receiverId: ID) {
    userMessages(receiverId: $receiverId) {
      id
      receiverId
      senderId
      createdAt
      sender {
        id
        username
      }
      recipient {
        id
        username
      }
      messageTitle
      messageContent
      unread
    }
  }
`;
const userSentMessages = gql`
  query($senderId: ID) {
    userSentMessages(senderId: $senderId) {
      id
      receiverId
      senderId
      createdAt
      sender {
        id
        username
      }
      recipient {
        id
        username
      }
      messageTitle
      messageContent
      unread
    }
  }
`;

const getUsernames = gql`
  query($username: String!) {
    getUsernames(username: $username) {
      id
      username
    }
  }
`;

module.exports = {
  getUser,
  getQuestion,
  getQuestions,
  getAnswer,
  checkUserEmail,
  searchQuestion,
  getMessages,
  userSentMessages,
  getUsernames,
  checkUsername,
};
