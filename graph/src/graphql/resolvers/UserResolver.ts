import { PrismaClient } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { RegisterInput } from "../schemas/inputs/RegisterInput";
import { User } from "../schemas/User";
import { LoginResponse } from "../schemas/response/LoginResponse";
import { LoginInput } from "../schemas/inputs/Login";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RegisterResponse } from "../schemas/response/RegisterResponse";
import {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken,
} from "../auth/refresh-token";
import { Context } from "../auth/auth-checker";

const prisma = new PrismaClient();

@Resolver((of) => User)
export class UserResolver {
    @Mutation((returns) => RegisterResponse)
    async register(
        @Arg("input") input: RegisterInput,
        @Ctx() { res }: Context,
    ): Promise<RegisterResponse> {
        const hashedPassword = await bcrypt.hash(input.password, 12);
        const user = await prisma.user.create({
            data: {
                ...input,
                password: hashedPassword,
            },
        });
        const token = createAccessToken(user.id);
        sendRefreshToken(res, createRefreshToken(user.id));
        return {
            user,
            token,
        };
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("input") { email, password }: LoginInput,
        @Ctx() { res }: Context,
    ): Promise<LoginResponse> {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error("Incorrect email or password");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Incorrect email or password");
        }
        const token = createAccessToken(user.id);
        sendRefreshToken(res, createRefreshToken(user.id));
        return {
            user,
            token,
        };
    }

    // a mutation that takes a google token and returns a login response
    @Mutation(() => LoginResponse)
    async googleLogin(
        @Arg("googleToken") googleToken: string,
        @Ctx() { res }: Context,
    ): Promise<LoginResponse> {
        // decode the token
        const decoded = jwt.decode(googleToken) as JwtPayload;
        // find the user in the database
        const user = await prisma.user.findUnique({
            where: { email: decoded.email },
        });
        // if user return login response
        if (user) {
            console.log("FOUND USER");
            // generate a new token
            const token = createAccessToken(user.id);
            sendRefreshToken(res, createRefreshToken(user.id));
            return {
                user,
                token,
            };
        }
        console.log("CREATING NEW USER");
        // if no user create a new user
        const newUser = await prisma.user.create({
            data: {
                email: decoded.email,
                firstName: decoded.given_name,
                lastName: decoded.family_name,
                // generate bcrypt hash for random password
                password: await bcrypt.hash(
                    Math.random().toString(36).slice(-8),
                    12,
                ),
            },
        });
        // generate a new token
        const token = createAccessToken(newUser.id);
        sendRefreshToken(res, createRefreshToken(newUser.id));
        // return login response
        return {
            user: newUser,
            token,
        };
    }

    @Query(() => User, { nullable: true })
    @Authorized()
    async whoAmI(@Ctx() { userId }: Context) {
        return prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
    }
}
