const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
// const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('books');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('books');
    },
    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params).sort({ createdAt: -1 });
    },
    book: async (parent, { bookId }) => {
      return Book.findOne({ _id: bookId });
    },
    // ================= ********IMPORTANT********====================
    // by adding context to our query, we can retreieve the logged in user without specifically accessed 
    // these need to be in the correct position, 
    // 1st parent object, 2nd args object, 3rd context object
    me: async (parent, args, context) => {
      if (context.user) { //if use exists on context then that means the token is valid due to our own logic in authMiddleware() that we wrote
        return User.findOne({ _id: context.user._id }).populate('books');
      }
      // LAST PIECE OF THE PUZZLE
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  // Mutation: {
  //   addUser: async (parent, { username, email, password }) => {
  //     const user = await User.create({ username, email, password });
  //     const token = signToken(user);
  //     return { token, user };
  //   },
  //   login: async (parent, { email, password }) => {
  //     const user = await User.findOne({ email });

  //     if (!user) {
  //       throw new AuthenticationError('No user found with this email address');
  //     }

  //     const correctPw = await user.isCorrectPassword(password);

  //     if (!correctPw) {
  //       throw new AuthenticationError('Incorrect credentials');
  //     }

  //     const token = signToken(user);

  //     return { token, user };
  //   },

  //   removeBook: async (parent, { bookId }, context) => {
  //     if (context.user) {
  //       return Thought.findOneAndUpdate(
  //         { _id: bookId },
  //         { new: true }
  //       );
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   },
  // },
};

module.exports = resolvers;
