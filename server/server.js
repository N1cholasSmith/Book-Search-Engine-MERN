const express = require('express');
const path = require('path');
const db = require('./config/connection');
// Import the ApolloServer class
const { ApolloServer } = require('apollo-server-express')


// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth')


const app = express();
const PORT = process.env.PORT || 3001;

// Create a new instance of an Apollo server with the GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
// add context to our server so data from the "authMiddleware()" function can passs data to our resolver functions
  context: authMiddleware,
})

// Update Express.js to use Apollo server features
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// -----------------------------------------------------------------
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
