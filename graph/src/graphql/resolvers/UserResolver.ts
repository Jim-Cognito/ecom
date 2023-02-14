import { PrismaClient } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { RegisterInput } from "../schemas/inputs/RegisterInput";
import { User } from "../schemas/User";
import { LoginResponse } from "../schemas/response/LoginResponse";
import { LoginInput } from "../schemas/inputs/Login";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RegisterResponse } from "../schemas/response/RegisterResponse";
import { Context } from "../auth/auth-checker";

const prisma = new PrismaClient();

@Resolver((of) => User)
export class UserResolver {
    @Mutation((returns) => RegisterResponse)
    async register(
        @Arg("input") input: RegisterInput,
    ): Promise<RegisterResponse> {
        const hashedPassword = await bcrypt.hash(input.password, 12);
        const user = await prisma.user.create({
            data: {
                ...input,
                password: hashedPassword,
            },
        });
        const token = jwt.sign(
            { userId: user.id },
            process.env.ACCESS_TOKEN_SECRET!,
            {
                expiresIn: "3600s",
            },
        );
        const refreshToken = jwt.sign(
            { userId: user.id },
            process.env.ACCESS_TOKEN_REFRESH!,
            {
                expiresIn: "30d",
            },
        );
        return {
            user,
            token,
            refreshToken,
        };
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("input") { email, password }: LoginInput,
    ): Promise<LoginResponse> {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error("Incorrect email or password");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Incorrect email or password");
        }
        const token = jwt.sign(
            { userId: user.id },
            process.env.ACCESS_TOKEN_SECRET!,
            {
                expiresIn: "3600s",
            },
        );
        const refreshToken = jwt.sign(
            { userId: user.id },
            process.env.ACCESS_TOKEN_REFRESH!,
            {
                expiresIn: "30d",
            },
        );
        return {
            user,
            token,
            refreshToken,
        };
    }

    @Query(() => User, { nullable: true })
    @Authorized()
    async whoAmI(@Ctx() { user }: Context) {
        return user;
    }

    @Mutation(() => LoginResponse)
    async refreshToken(
        @Arg("refreshToken") refreshToken: string,
    ): Promise<LoginResponse> {
        try {
            const decoded = jwt.verify(
                refreshToken,
                process.env.ACCESS_TOKEN_REFRESH!,
            ) as { userId: string };

            const user = await prisma.user.findUnique({
                where: { id: Number(decoded.userId) },
            });
            if (!user) {
                throw new Error("User not found");
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.ACCESS_TOKEN_SECRET!,
                {
                    expiresIn: "60s",
                },
            );

            const newRefreshToken = jwt.sign(
                { userId: user.id },
                process.env.ACCESS_TOKEN_REFRESH!,
                {
                    expiresIn: "120s",
                },
            );

            return { user, token, refreshToken: newRefreshToken };
        } catch (error) {
            throw new Error("Refresh token is invalid or expired");
        }
    }
}
