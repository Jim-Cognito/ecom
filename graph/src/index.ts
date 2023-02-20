import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ProductResolver } from "./graphql/resolvers/ProductResolver";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./graphql/resolvers/UserResolver";
import { authChecker } from "./graphql/auth/auth-checker";
import {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken,
} from "./graphql/auth/refresh-token";
import fs from "fs";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

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

    app.use(
        cors({
            // front end url
            origin: true,
            credentials: true,
        }),
    );

    // refresh token endpoint that gets ttokenn from cookie and sets new token in cookie
    app.post("/refresh_token", async (req, res) => {
        console.log(req.cookies);
        const token = req.cookies.jid;
        if (!token) {
            console.log("NO TOKEN");
            return res.send({ ok: false, accessToken: null });
        }
        let payload: any = null;
        try {
            payload = verify(token, process.env.ACCESS_TOKEN_REFRESH!);
        } catch (err) {
            console.log("INVALID TOKEN");
            console.log(err);
            return res.send({ ok: false, accessToken: null });
        }
        const { userId } = payload as any;
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            console.log("INVALID USER");
            return res.send({ ok: false, accessToken: null });
        }

        sendRefreshToken(res, createRefreshToken(user.id));
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Origin", "http://localhost:5173");

        return res.send({ ok: true, accessToken: createAccessToken(userId) });
    });

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
