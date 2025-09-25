import { Router } from "express";
import {
  createRating,
  deleteRating,
  getRatingById,
  getRatings,
  updateRating,
} from "../controllers";
import {
  accessMiddleware,
  authMiddleware,
  validationMiddleware,
} from "../middelwares";
import {
  createRatingValidation,
  deleteRatingValidation,
  getRatingValidation,
  updateRatingValidation,
} from "../validations";
import { getRatingByIdValidation } from "../validations/ratingValidations";
import { Role } from "../generated/prisma";

export const ratingRouter = Router();

ratingRouter.use(authMiddleware);

ratingRouter.get(
  "/",
  accessMiddleware([Role.SYSTEM_ADMIN, Role.STORE_OWNER, Role.USER]),
  validationMiddleware(getRatingValidation),
  getRatings
);

ratingRouter.get(
  "/by-id/:id",
  accessMiddleware([Role.SYSTEM_ADMIN, Role.STORE_OWNER]),
  validationMiddleware(getRatingByIdValidation),
  getRatingById
);

ratingRouter.post(
  "/",
  accessMiddleware([Role.USER]),
  validationMiddleware(createRatingValidation),
  createRating
);

ratingRouter.patch(
  "/:id",
  accessMiddleware([Role.USER]),
  validationMiddleware(updateRatingValidation),
  updateRating
);

ratingRouter.delete(
  "/:id",
  accessMiddleware([Role.USER]),
  validationMiddleware(deleteRatingValidation),
  deleteRating
);
