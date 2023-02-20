import { sign } from "jsonwebtoken";
import { Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAccessToken = (userId: number) => {
    return sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "1m",
    });
};

export const createRefreshToken = (userId: number) => {
    return sign({ userId }, process.env.ACCESS_TOKEN_REFRESH!, {
        expiresIn: "2m",
    });
};

export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie("jid", token, {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
        domain: "localhost",
        // cookie valid for 1 hour
        expires: new Date(Date.now() + 60 * 60 * 1000),
        maxAge: 60 * 60 * 1000,
    });
};
