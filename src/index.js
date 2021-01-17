const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

let idCount = links.length

const resolvers = {
    Query: {
        info: () => `This is the API of Hackernews Clone`,
        feed: () => links,
        link: (parent, args) => links.find((link) => link.id == args.id)
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link
        },
        //updateLink(id: ID!, url: String, description: String): Link
        updateLink: (parent, args) => {
            const link = {
                id: args.id,
                url: args.url,
                description: args.description
            }
            const position = links.findIndex((link) => link.id == args.id)
            if(position == -1){
                return null;
            }else {
                links[position] = link
                return links[position];
            }
        }, 
        //deleteLink(id: ID!): Link
        deleteLink: (parent, args) => {
            const position = links.findIndex((link) => link.id == args.id)
            if(position > -1){
                links.splice(position, 1)
            }
            return null
        }
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url
    }
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers
})

server.listen().then(({url}) => {
    console.log(url)
});