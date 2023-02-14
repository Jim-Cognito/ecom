import { AuthChecker } from "type-graphql";
import jwt from "jsonwebtoken";

export interface Context {
    req: {
        userId: string;
        headers: {
            authorization: string;
        };
    };
}

export const authChecker: AuthChecker<Context> = async ({ context }) => {
    const authorization = context.req.headers.authorization;
    if (!authorization) {
        return false;
    }
    const token = authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        return true;
    } catch (error) {
        return false;
    }
};
