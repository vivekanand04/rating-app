import { Request, Response } from "express";
import { prisma } from "../lib";
import { genSaltSync, hash } from "bcryptjs";
import { errorResponse, successResponse } from "../utils";
import { Role } from "../generated/prisma";

export async function createUser(req: Request, res: Response): Promise<any> {
  try {
    const { name, email, password, address, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json(errorResponse({ message: "User already exists." }));
      return;
    }

    const salt = genSaltSync(10);

    const hashedPassword = await hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        role,
      },
    });

    const userData = {
      id: newUser.id,
      email: newUser.email,
      address: newUser.address,
      role: newUser.role,
    };

    return res
      .status(201)
      .json(successResponse({ message: "New user created.", data: userData }));
  } catch (error) {
    console.error("Error while creating user", error);
    res.status(500).json(errorResponse({ message: "Internal server error" }));
  }
}

export async function getUsers(req: Request, res: Response): Promise<any> {
  try {
    const { name, email, role } = req.query as {
      name?: string;
      email?: string;
      role?: Role;
    };

    const filter = {
      ...(name ? { name } : {}),
      ...(email ? { email } : {}),
      ...(role ? { role } : {}),
    };

    const users = await prisma.user.findMany({
      where: filter,
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        stores: {
          select: {
            id: true,
            name: true,
            ratings: {
              select: {
                value: true,
              },
            },
          },
        },
      },
    });

    if (users.length === 0) {
      res.status(404).json(errorResponse({ message: "No users found." }));
      return;
    }

    const usersWithAvgRating = users.map((user) => {
      let storeRating: number | null = null;

      if (user.role === "STORE_OWNER" && user.stores?.length) {
        const allRatings = user.stores.flatMap((store) =>
          store.ratings.map((r) => r.value)
        );

        if (allRatings.length > 0) {
          const total = allRatings.reduce((sum, value) => sum + value, 0);
          storeRating = Number((total / allRatings.length).toFixed(2));
        }
      }

      return {
        ...user,
        storeRating,
      };
    });

    res.status(200).json(
      successResponse({
        message: "Users fetched successfully.",
        data: usersWithAvgRating,
      })
    );
  } catch (error) {
    console.error("Error while getiing users", error);
    res.status(500).json(errorResponse({ message: "Internal server error" }));
  }
}

export async function getUserById(req: Request, res: Response): Promise<any> {
  try {
    const userId = req.params.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        ratings: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json(errorResponse({ message: "No user found." }));
    }

    return res.status(200).json(
      successResponse({
        message: "User found.",
        data: user,
      })
    );
  } catch (error) {
    console.error(errorResponse({ message: "Internal server error" }));
  }
}

export async function updateUser(req: Request, res: Response): Promise<any> {
  try {
    const userId = req.params.id;
    const { name, email, address, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      res.status(404).json(errorResponse({ message: "User not found." }));
      return;
    }

    if (email) {
      const emailTaken = await prisma.user.findFirst({
        where: {
          email,
          NOT: {
            id: userId,
          },
        },
      });

      if (emailTaken) {
        res
          .status(409)
          .json(
            errorResponse({ message: "Email already in use by another user." })
          );
        return;
      }
    }

    const updateFields: Record<string, any> = {
      ...(name && { name }),
      ...(address && { address }),
      ...(role && { role }),
      ...(email && { email }),
    };

    if (password) {
      const salt = genSaltSync(10);
      const hashedPassword = await hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateFields,
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
      },
    });

    res.status(200).json(
      successResponse({
        message: "User updated successfully.",
        data: updatedUser,
      })
    );
  } catch (error) {
    console.error("Error while updating user", error);
    res.status(500).json(errorResponse({ message: "Internal server error" }));
  }
}

export async function deleteUser(req: Request, res: Response): Promise<any> {
  try {
    const userId = req.params.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json(errorResponse({ message: "User not found." }));
      return;
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    res
      .status(200)
      .json(successResponse({ message: "User deleted successfully." }));
  } catch (error) {
    console.error("Error while deleting user", error);
    res.status(500).json(errorResponse({ message: "Internal server error" }));
  }
}
