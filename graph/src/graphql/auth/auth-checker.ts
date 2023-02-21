import { AuthChecker } from "type-graphql";
import { verify } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export interface Context {
    req: Request;
    res: Response;
    userId: number;
}

export const authChecker: AuthChecker<Context> = async ({ context }) => {
    const authorization = context.req.headers.authorization;
    if (!authorization) {
        return false;
    }
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
        userId: string;
    };
    const user = await prisma.user.findUnique({
        where: {
            id: Number(payload.userId),
        },
    });
    if (user) {
        context.userId = user.id;
        return true;
    } else {
        return false;
    }
};
