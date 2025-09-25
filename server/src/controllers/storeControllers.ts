import e, { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils";
import { prisma } from "../lib";
import { STORE_OWNER_USER_ROLE } from "../constants";
import { Role } from "../generated/prisma";

export async function createStore(req: Request, res: Response): Promise<any> {
  try {
    const { name, email, address, ownerId } = req.body;

    const existingStore = await prisma.store.findUnique({
      where: { email },
    });

    if (existingStore) {
      return res.status(409).json(
        errorResponse({
          message: "A store with the same email already exists.",
        })
      );
    }

    const owner = await prisma.user.findUnique({
      where: { id: ownerId },
    });

    if (!owner || owner.role !== STORE_OWNER_USER_ROLE) {
      res.status(400).json(errorResponse({ message: "Invalid store owner." }));
      return;
    }

    const newStore = await prisma.store.create({
      data: { name, email, address, ownerId },
    });

    return res.status(201).json(
      successResponse({
        message: "New store created successfully.",
        data: newStore,
      })
    );
  } catch (error) {
    console.error("Error while creating store", error);
    res.status(500).json(errorResponse({ message: "Internal server error" }));
  }
}

export async function getStores(req: Request, res: Response): Promise<any> {
  try {
    const { name, email, address } = req.query as {
      name?: string;
      email?: string;
      address?: string;
    };

    const filter = {
      ...(name ? { name } : {}),
      ...(email ? { email } : {}),
      ...(address ? { address } : {}),
    };

    const currentUser = req.user;

    const stores = await prisma.store.findMany({
      where: filter,
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        owner: {
          select: { id: true, name: true },
        },
        ratings: {
          select: {
            id: true,
            value: true,
            userId: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!stores || stores.length === 0) {
      res.status(404).json(errorResponse({ message: "No stores found." }));
      return;
    }

    const storesWithAverage = stores.map((store) => {
      const ratingValues = store.ratings.map((r) => r.value);

      const averageRating =
        ratingValues.length > 0
          ? Number(
              (
                ratingValues.reduce((sum, val) => sum + val, 0) /
                ratingValues.length
              ).toFixed(2)
            )
          : 0;

      const userRating =
        currentUser?.role === Role.USER
          ? store.ratings.find((r) => r.userId === currentUser.id) ?? null
          : null;

      return {
        ...store,
        averageRating,
        userRating,
      };
    });

    res.status(200).json(
      successResponse({
        message: "Stores fetched successfully.",
        data: storesWithAverage,
      })
    );
  } catch (error) {
    console.error("Error while gettin stores", error);
    res.status(500).json(errorResponse({ message: "Internal sever error" }));
  }
}

export async function getStoreById(req: Request, res: Response): Promise<any> {
  try {
    const storeId = req.params.id;

    const store = await prisma.store.findUnique({
      where: { id: storeId },
      select: {
        id: true,
        name: true,
        address: true,
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
        ratings: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!store) {
      res.status(404).json(errorResponse({ message: "Store not found." }));
      return;
    }

    res.status(200).json(
      successResponse({
        message: "Store fetched successfully.",
        data: store,
      })
    );
  } catch (error) {
    console.error("Error while getting store by id", error);
    res.status(500).json(errorResponse({ message: "Internal server error" }));
  }
}

export async function updateStore(req: Request, res: Response): Promise<any> {
  try {
    const storeId = req.params.id;
    const { name, email, address } = req.body;

    const existingStore = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!existingStore) {
      res.status(404).json(errorResponse({ message: "Store not found." }));
      return;
    }

    if (email) {
      const emailTaken = await prisma.store.findFirst({
        where: {
          email,
          NOT: {
            id: storeId,
          },
        },
      });

      if (emailTaken) {
        res.status(409).json(
          errorResponse({
            message: "Email is already used by another store.",
          })
        );
        return;
      }
    }

    const updateFields: Record<string, any> = {
      ...(name && { name }),
      ...(email && { email }),
      ...(address && { address }),
    };

    const updatedStore = await prisma.store.update({
      where: { id: storeId },
      data: updateFields,
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        updatedAt: true,
      },
    });

    res.status(200).json(
      successResponse({
        message: "Store updated successfully.",
        data: updatedStore,
      })
    );
  } catch (error) {
    console.error("Error while updating store", error);
    res.status(500).json(errorResponse({ message: "Internal server error" }));
  }
}

export async function deleteStore(req: Request, res: Response): Promise<any> {
  try {
    const storeId = req.params.id;

    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      res.status(404).json(errorResponse({ message: "Store not found." }));
      return;
    }

    await prisma.store.delete({
      where: { id: storeId },
    });

    res
      .status(200)
      .json(successResponse({ message: "Store deleted successfully." }));
  } catch (error) {
    console.error("Error while deleting store", error);
    res.status(500).json(errorResponse({ message: "Internal server error" }));
  }
}
