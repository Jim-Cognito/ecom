import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ProductResolver } from "./graphql/resolvers/ProductResolver";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./graphql/resolvers/UserResolver";
import { authChecker } from "./graphql/auth/auth-checker";
import { printSchema } from "graphql";
import fs from "fs";

async function main() {
    const schema = await buildSchema({
        resolvers: [ProductResolver, UserResolver],
        authChecker,
    });

    const schemaSDL = printSchema(schema, { commentDescriptions: true });
    fs.writeFileSync("../schema.gql", schemaSDL);
    const app = express();

    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => {
            return {
                req,
                res,
            };
        },
    });

    const path = "/graphql";

    const port = 4000;

    await server.start();

    server.applyMiddleware({ app, path });

    app.listen({ port }, () =>
        console.log(
            `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
        ),
    );
}

main().catch((error) => {
    console.error(error);
});
