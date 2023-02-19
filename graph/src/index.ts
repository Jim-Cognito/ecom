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

    // refresh token endpoint that gets ttokenn from cookie and sets new token in cookie
    app.post("/refresh_token", async (req, res) => {
        const token = req.cookies.jid;
        if (!token) {
            return res.send({ ok: false, accessToken: null });
        }
        let payload: any = null;
        try {
            payload = verify(token, process.env.ACCESS_TOKEN_REFRESH!);
        } catch (err) {
            console.log(err);
            return res.send({ ok: false, accessToken: null });
        }
        const { userId } = payload as any;
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.send({ ok: false, accessToken: null });
        }

        sendRefreshToken(res, createRefreshToken(user.id));

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

    server.applyMiddleware({ app, path });

    app.listen({ port }, () =>
        console.log(`Server is listening on port ${port} 📞`),
    );
}

main().catch((error) => {
    console.error(error);
});
