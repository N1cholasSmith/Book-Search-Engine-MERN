const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    books: [Book]
  }

  type Book {
    _id: ID!
    title: String!
    description: String!
    authors: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

//=========================================== TODO - AUDIT CODE ============================================
 
  type Query {
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(thoughtId: ID!): Book
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
