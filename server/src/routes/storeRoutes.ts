import { Router } from "express";
import {
  createStore,
  deleteStore,
  getStoreById,
  getStores,
  updateStore,
} from "../controllers";
import {
  accessMiddleware,
  authMiddleware,
  validationMiddleware,
} from "../middelwares";
import {
  createStoreValidation,
  deleteStoreValidation,
  getStoreValidation,
  updateStoreValidation,
} from "../validations";
import { getStoreByIdValidation } from "../validations/storeValidation";
import { Role } from "../generated/prisma";

export const storeRouter = Router();

storeRouter.use(authMiddleware);

storeRouter.get(
  "/",
  accessMiddleware([
    Role.SYSTEM_ADMIN,
    Role.ADMIN,
    Role.USER,
    Role.STORE_OWNER,
  ]),
  validationMiddleware(getStoreValidation),
  getStores
);

storeRouter.get(
  "/by-id/:id",
  accessMiddleware([
    Role.SYSTEM_ADMIN,
    Role.ADMIN,
    Role.USER,
    Role.STORE_OWNER,
  ]),
  validationMiddleware(getStoreByIdValidation),
  getStoreById
);

storeRouter.post(
  "/",
  accessMiddleware([Role.SYSTEM_ADMIN]),
  validationMiddleware(createStoreValidation),
  createStore
);

storeRouter.patch(
  "/:id",
  accessMiddleware([Role.SYSTEM_ADMIN, Role.STORE_OWNER]),
  validationMiddleware(updateStoreValidation),
  updateStore
);

storeRouter.delete(
  "/:id",
  accessMiddleware([Role.SYSTEM_ADMIN]),
  validationMiddleware(deleteStoreValidation),
  deleteStore
);
