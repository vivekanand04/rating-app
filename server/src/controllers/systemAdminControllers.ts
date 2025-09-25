import { Request, Response } from "express";
import { prisma } from "../lib";

export async function getSystemAdminOverview(req: Request, res: Response) {
  try {
    const [totalUsers, totalStores, totalRatings] = await Promise.all([
      prisma.user.count(),
      prisma.store.count(),
      prisma.rating.count(),
    ]);

    res.status(200).json({
      success: true,
      message: "System admin dashboard stats fetched",
      data: [
        { label: "Total Users", value: totalUsers },
        { label: "Total Stores", value: totalStores },
        { label: "Total Ratings", value: totalRatings },
      ],
    });
  } catch (error) {
    console.error("Error fetching admin overview:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
