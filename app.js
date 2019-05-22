const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const typeDefs = require("./typeDefs")
const resolvers = require("./resolvers")
const models = require("./models")

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models }
})

server.applyMiddleware({ app })

const serveStatic = require("serve-static")
const path = require("path")
app.use(
  serveStatic(path.join(__dirname, "public"), {
    maxAge: "1d"
  })
)

app.use((req, res, next) => {
  const { delay } = req.query

  if (delay) {
    setTimeout(() => {
      next()
    }, Number(delay))
  } else {
    next()
  }
})

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
