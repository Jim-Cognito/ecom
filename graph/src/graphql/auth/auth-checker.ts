import { AuthChecker } from "type-graphql";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export interface Context {
    req: {
        userId: string;
        headers: {
            authorization: string;
        };
    };
    user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    };
}

export const authChecker: AuthChecker<Context> = async ({ context }) => {
    const authorization = context.req.headers.authorization;
    if (!authorization) {
        return false;
    }
    const token = authorization.split(" ")[1];
    const { userId } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
        userId: string;
    };
    const user = await prisma.user.findUnique({
        where: {
            id: Number(userId),
        },
    });
    if (user) {
        context.user = user;
        return true;
    } else {
        return false;
    }
};
