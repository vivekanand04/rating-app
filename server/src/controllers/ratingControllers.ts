import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils";
import { prisma } from "../lib";
import { Role } from "../generated/prisma";

export async function createRating(req: Request, res: Response): Promise<any> {
  try {
    const { value, userId, storeId } = req.body;

    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      res.status(404).json(errorResponse({ message: "Store not found." }));
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json(errorResponse({ message: "User not found." }));
      return;
    }

    const newRating = await prisma.rating.create({
      data: {
        value,
        userId,
        storeId,
      },
      select: {
        id: true,
        value: true,
        userId: true,
        storeId: true,
        createdAt: true,
      },
    });

    res.status(201).json(
      successResponse({
        message: "Rating created successfully.",
        data: newRating,
      })
    );
  } catch (error) {
    console.error("Error while creating rating:", error);
    res.status(500).json(errorResponse({ message: "Internal server error." }));
  }
}

export async function getRatings(req: Request, res: Response): Promise<any> {
  try {
    const { storeId, userId, value } = req.query as {
      storeId?: string;
      userId?: string;
      value?: string;
    };

    const currentUser = req.user;

    let storeIds: string[] | undefined;

    if (currentUser?.role === Role.STORE_OWNER) {
      const ownedStores = await prisma.store.findMany({
        where: { ownerId: currentUser.id },
        select: { id: true },
      });

      storeIds = ownedStores.map((s) => s.id);
      if (storeIds.length === 0) {
        return res
          .status(200)
          .json(successResponse({ message: "No ratings found.", data: [] }));
      }
    }

    const filter = {
      ...(storeId ? { storeId } : {}),
      ...(userId ? { userId } : {}),
      ...(value ? { value: Number(value) } : {}),
      ...(storeIds ? { storeId: { in: storeIds } } : {}),
    };

    const ratings = await prisma.rating.findMany({
      where: filter,
      select: {
        id: true,
        value: true,
        storeId: true,
        user: { select: { id: true, name: true } },
        store: { select: { id: true, name: true } },
      },
    });

    if (!ratings.length) {
      res.status(404).json(errorResponse({ message: "No ratings found." }));
      return;
    }

    const ratingsWithAverages = ratings.map((rating) => {
      const storeId = rating.storeId;

      const storeRatings = ratings
        .filter((r) => r.storeId === storeId)
        .map((r) => r.value);

      const averageRating = storeRatings.length
        ? Number(
            (
              storeRatings.reduce((a, b) => a + b, 0) / storeRatings.length
            ).toFixed(2)
          )
        : 0;

      return {
        ...rating,
        store: {
          ...rating.store,
          averageRating,
        },
      };
    });

    res.status(200).json(
      successResponse({
        message: "Ratings fetched successfully.",
        data: ratingsWithAverages,
      })
    );
  } catch (error) {
    console.error("Error while fetching ratings:", error);
    res.status(500).json(errorResponse({ message: "Internal server error." }));
  }
}

export async function getRatingById(req: Request, res: Response): Promise<any> {
  try {
    const ratingId = req.params.id;

    const rating = await prisma.rating.findUnique({
      where: { id: ratingId },
      select: {
        id: true,
        value: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!rating) {
      res.status(404).json(errorResponse({ message: "Rating not found." }));
      return;
    }

    res.status(200).json(
      successResponse({
        message: "Rating fetched successfully.",
        data: rating,
      })
    );
  } catch (error) {
    console.error("Error while getting rating by id", error);
    res.status(500).json(errorResponse({ message: "Internal server error" }));
  }
}

export async function updateRating(req: Request, res: Response): Promise<any> {
  try {
    const ratingId = req.params.id;
    const { value } = req.body;

    const existingRating = await prisma.rating.findUnique({
      where: { id: ratingId },
    });

    if (!existingRating) {
      res.status(404).json(errorResponse({ message: "Rating not found." }));
      return;
    }

    const updatedRating = await prisma.rating.update({
      where: { id: ratingId },
      data: { value },
      select: {
        id: true,
        value: true,
        storeId: true,
        userId: true,
        updatedAt: true,
      },
    });

    res.status(200).json(
      successResponse({
        message: "Rating updated successfully.",
        data: updatedRating,
      })
    );
  } catch (error) {
    console.error("Error while updating store", error);
    res.status(500).json(errorResponse({ message: "Internal server error" }));
  }
}

export async function deleteRating(req: Request, res: Response): Promise<any> {
  try {
    const ratingId = req.params.id;

    const rating = await prisma.rating.findUnique({
      where: { id: ratingId },
    });

    if (!rating) {
      res.status(404).json(errorResponse({ message: "Rating not found." }));
      return;
    }

    await prisma.rating.delete({
      where: { id: ratingId },
    });

    res
      .status(200)
      .json(successResponse({ message: "Rating deleted successfully." }));
  } catch (error) {
    console.error("Error while deleting rating", error);
    res.status(500).json(errorResponse({ message: "Internal server error" }));
  }
}
