import { sign } from "jsonwebtoken";
import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();

export const refreshToken = async (req: any, res: Response) => {
    const token = req.cookies.jid;
    if (!token) {
        return res.status(400).send();
    }
    let payload: any = null;
    try {
        payload = verify(token, process.env.ACCESS_TOKEN_REFRESH!);
    } catch (err) {
        return res.status(401).send();
    }
    const { userId } = payload as any;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
        return res.status(401).send();
    }
    sendRefreshToken(res, createRefreshToken(user.id));
    return res.status(200).send({ accessToken: createAccessToken(userId) });
};

export const createAccessToken = (userId: number) => {
    return sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "10s",
    });
};

export const createRefreshToken = (userId: number) => {
    return sign({ userId }, process.env.ACCESS_TOKEN_REFRESH!, {
        expiresIn: "20s",
    });
};

export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie("jid", token, {
        httpOnly: true,
        sameSite: "none",
        path: "/refresh_token",
        secure: true,
        domain: "localhost",
        // cookie valid for 1 hour
        expires: new Date(Date.now() + 60 * 60 * 1000),
        maxAge: 60 * 60 * 1000,
    });
};
