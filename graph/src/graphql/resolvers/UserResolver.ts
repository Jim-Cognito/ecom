import { PrismaClient } from "@prisma/client";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
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
    @Mutation((returns) => User)
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
                expiresIn: "10d",
            },
        );
        return {
            user,
            token,
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
                expiresIn: "10d",
            },
        );
        return {
            user,
            token,
        };
    }

    @Query(() => User, { nullable: true })
    async whoAmI(@Ctx() { req }: Context) {
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return null;
        }
        try {
            const token = authorization.split(" ")[1];
            const { userId } = jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET!,
            ) as {
                userId: string;
            };
            return await prisma.user.findUnique({
                where: {
                    id: Number(userId),
                },
            });
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
