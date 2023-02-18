import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ProductResolver } from "./graphql/resolvers/ProductResolver";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./graphql/resolvers/UserResolver";
import { authChecker } from "./graphql/auth/auth-checker";
import fs from "fs";

async function main() {
    const schema = await buildSchema({
        resolvers: [ProductResolver, UserResolver],
        authChecker,
        emitSchemaFile: {
            path: __dirname + "/schema.graphql",
            commentDescriptions: true,
        },
    });

    const typeDefs = fs.readFileSync("src/schema.graphql", "utf8");

    const app = express();

    const server = new ApolloServer({
        schema,
        typeDefs,
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
        console.log(`Server is listening on port ${port} 📞`),
    );
}

main().catch((error) => {
    console.error(error);
});
