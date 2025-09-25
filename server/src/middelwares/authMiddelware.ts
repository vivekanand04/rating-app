import { NextFunction, Request, Response } from "express";
import { JWT_TOKEN } from "../constants";
import { envConfig } from "../config/envConfig";
import { prisma } from "../lib";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

type DecodedToken = {
  id: string;
};

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = req.cookies[JWT_TOKEN];

    if (!token) {
      res.status(401).json({ error: "Unauthorized. Token missing." });
      return;
    }

    const decrypted = jwt.verify(
      token,
      envConfig.JWT_SECRET_KEY
    ) as DecodedToken;

    const user = await prisma.user.findUnique({
      where: { id: decrypted.id },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      res.status(401).json({ error: "Unauthorized. Invalid token." });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
