import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers";
import {
  accessMiddleware,
  authMiddleware,
  validationMiddleware,
} from "../middelwares";
import { getUserValidation } from "../validations";
import {
  createUserValidation,
  deleteUserValidation,
  getUserByIdValidation,
  updateUserValidation,
} from "../validations/userValidations";
import { Role } from "../generated/prisma";

export const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.get(
  "/",
  accessMiddleware([Role.SYSTEM_ADMIN]),
  validationMiddleware(getUserValidation),
  getUsers
);

userRouter.get(
  "/by-id/:id",
  accessMiddleware([Role.SYSTEM_ADMIN, Role.ADMIN]),
  validationMiddleware(getUserByIdValidation),
  getUserById
);

userRouter.post(
  "/",
  accessMiddleware([Role.SYSTEM_ADMIN, Role.ADMIN]),
  validationMiddleware(createUserValidation),
  createUser
);

userRouter.patch(
  "/:id",
  accessMiddleware([Role.SYSTEM_ADMIN, Role.ADMIN]),
  validationMiddleware(updateUserValidation),
  updateUser
);

userRouter.delete(
  "/:id",
  accessMiddleware([Role.SYSTEM_ADMIN]),
  validationMiddleware(deleteUserValidation),
  deleteUser
);
