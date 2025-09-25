import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";

export function validationMiddleware(validationChains: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(
      validationChains.map((validation) => validation.run(req))
    );

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    next();
  };
}
