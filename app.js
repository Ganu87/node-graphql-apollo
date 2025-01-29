const { ApolloServer } = require('@apollo/server');  // Import ApolloServer
const { expressMiddleware } = require('@apollo/server/express4');  // For Express integration
const express = require('express');
const dotenv = require('dotenv');
const typeDefs = require('./graphql/typeDef');
const resolvers = require('./graphql/resolver');

dotenv.config();  // Load environment variables from .env

const app = express();

// Add the JSON body parser middleware before Apollo Server
app.use(express.json());  // This is important for parsing incoming JSON data

// Initialize ApolloServer
const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.start().then(() => {
    // Middleware for Apollo Server GraphQL
    app.use('/graphql', expressMiddleware(server));

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
