import "reflect-metadata";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ProductResolver } from './resolvers/ProductResolver';
import { buildSchema } from 'type-graphql';

async function main() {
    const schema = await buildSchema({
        resolvers: [ProductResolver]
    })
    const app = express();
  
    const server = new ApolloServer({
      schema
    });

    const path = '/graphql'

    const port = 4000

    await server.start();
  
    server.applyMiddleware({ app, path });
  
    app.listen({ port }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${path}`)
    );
  }
  
  main().catch((error) => {
    console.error(error);
  });
  
