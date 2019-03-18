const { GraphQLServer } = require('graphql-yoga')

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links,
    link: (parent, args) => links.find(link => link.id === args.id)
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
    updateLink: (parent, args) => {
      const { id, url, description } = args
      let link = links.find(link => link.id === id)
      console.log(link)
      link.url = url || link.url
      link.description = description
      return link
    },
    deleteLink: (parent, args) => {
      const { id } = args
      let index = links.findIndex(link => link.id === id)
      let deletedLink = links[index]
      links.splice(index, 1)
      return deletedLink
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log('Server is running on http://localhost:4000'))
