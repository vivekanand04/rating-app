import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers";
import { validationMiddleware } from "../middelwares";
import { signInValidation, signUpValidation } from "../validations";

export const authRouter = Router();

authRouter.post("/signup", validationMiddleware(signUpValidation), signUp);

authRouter.post("/signin", validationMiddleware(signInValidation), signIn);

authRouter.post("/signout", signOut);
