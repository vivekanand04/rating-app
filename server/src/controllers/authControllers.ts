import { Request, Response } from "express";
import { prisma } from "../lib";
import { compare, genSaltSync, hash } from "bcryptjs";
import { JWT_EXPIRY, JWT_MAX_AGE, JWT_TOKEN } from "../constants";
import { envConfig } from "../config/envConfig";
import { successResponse, errorResponse } from "../utils";
import jwt from "jsonwebtoken";

export async function signUp(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, address, password, confirmPassword } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(409).json(errorResponse({ message: "User already exists." }));
      return;
    }

    if (password !== confirmPassword) {
      res
        .status(400)
        .json(errorResponse({ message: "Passwords do not match." }));
      return;
    }

    const salt = genSaltSync(10);

    const hashedPassword = await hash(password, salt);

    await prisma.user.create({
      data: {
        name,
        email,
        address,
        password: hashedPassword,
      },
    });

    res
      .status(201)
      .json(successResponse({ message: "User registered successfully." }));
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json(errorResponse({ message: "Internal server error." }));
  }
}

export async function signIn(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        password: true,
      },
    });

    if (!user) {
      res.status(401).json(errorResponse({ message: "Invalid credentials." }));
      return;
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(401).json(errorResponse({ message: "Invalid credentials." }));
      return;
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      envConfig.JWT_SECRET_KEY,
      { expiresIn: JWT_EXPIRY }
    );

    res.cookie(JWT_TOKEN, token, {
      maxAge: JWT_MAX_AGE,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    const userData = {
      id: user.id,
      name: user.name,
      address: user.address,
      email: user.email,
      role: user.role,
    };

    res.status(200).json(
      successResponse({
        message: "User successfully signed in.",
        data: userData,
      })
    );
  } catch (error) {
    console.error("Error during sign in:", error);
    res.status(500).json(errorResponse({ message: "Internal server error." }));
  }
}

export async function signOut(req: Request, res: Response): Promise<any> {
  try {
    res.clearCookie(JWT_TOKEN);

    res.json(successResponse({ message: "User signed out successfully" }));
  } catch (error) {
    console.error("Error while signout", error);
    res.status(500).json(errorResponse({ message: "Internal server error" }));
  }
}
