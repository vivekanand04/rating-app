import { Router } from "express";
import { accessMiddleware, authMiddleware } from "../middelwares";
import { getSystemAdminOverview } from "../controllers/systemAdminControllers";
import { Role } from "../generated/prisma";

export const systemAdminRouter = Router();

systemAdminRouter.use(authMiddleware);

systemAdminRouter.get(
  "/overview",
  accessMiddleware([Role.SYSTEM_ADMIN]),
  getSystemAdminOverview
);
