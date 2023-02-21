import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ProductResolver } from "./graphql/resolvers/ProductResolver";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./graphql/resolvers/UserResolver";
import { authChecker } from "./graphql/auth/auth-checker";
import { refreshToken } from "./graphql/auth/refresh-token";
import fs from "fs";
import cookieParser from "cookie-parser";
import cors from "cors";

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

    app.use(cookieParser());

    app.use(express.json());

    app.use(
        cors({
            origin: "http://localhost:5173",
            credentials: true,
        }),
    );

    app.post("/refresh_token", refreshToken);

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

    server.applyMiddleware({ app, path, cors: false });

    app.listen({ port }, () =>
        console.log(`Server is listening on port ${port} 📞`),
    );
}

main().catch((error) => {
    console.error(error);
});
