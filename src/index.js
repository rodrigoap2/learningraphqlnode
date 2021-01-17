const { ApolloServer } = require('apollo-server');

const typeDefs = `
    type Query {
        info : String!
    }
`

const resolvers = {
    Query: {
        info: () => `This is the API of Hackernews Clone`
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(url)
});