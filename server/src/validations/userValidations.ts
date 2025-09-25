import { body, param, query } from "express-validator";
import { Role } from "../generated/prisma";

export const createUserValidation = [
  body("name")
    .isString()
    .withMessage("Name must be a string.")
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 20, max: 60 })
    .withMessage("Name must be between 20 and 60 characters."),

  body("email")
    .isString()
    .withMessage("Email must be a string.")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email address."),

  body("password")
    .isString()
    .withMessage("Password must be a string.")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be 8–16 characters long.")
    .matches(/[A-Z]/)
    .withMessage("Password must include at least one uppercase letter.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must include at least one special character."),

  body("address")
    .isString()
    .withMessage("Address must be a string.")
    .notEmpty()
    .withMessage("Address is required.")
    .isLength({ max: 400 })
    .withMessage("Address must be at most 400 characters long."),

  body("role")
    .isString()
    .withMessage("Role must be a string.")
    .notEmpty()
    .withMessage("Role is required.")
    .custom((value) => {
      const validRoles = Object.values(Role);
      if (!validRoles.includes(value)) {
        throw new Error("Invalid role value.");
      }
      return true;
    }),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),
];

export const getUserValidation = [
  query("name")
    .optional()
    .isString()
    .withMessage("Name must be a string.")
    .notEmpty()
    .withMessage("Name cannot be an empty string."),

  query("email")
    .optional()
    .isString()
    .withMessage("Email must be a string.")
    .isEmail()
    .withMessage("Invalid email format."),

  query("role")
    .optional()
    .isString()
    .withMessage("Role must be a string.")
    .notEmpty()
    .withMessage("Role cannot be an empty string.")
    .custom((value) => {
      const validRoles = Object.values(Role);
      if (!validRoles.includes(value)) {
        throw new Error("Invalid role.");
      }
      return true;
    }),
];

export const getUserByIdValidation = [
  param("id")
    .isString()
    .withMessage("User ID must be a string.")
    .notEmpty()
    .withMessage("User ID is required.")
    .isUUID()
    .withMessage("Id must be valid UUID"),
];

export const updateUserValidation = [
  param("id")
    .isString()
    .withMessage("User ID must be a string.")
    .notEmpty()
    .withMessage("User ID is required.")
    .isUUID()
    .withMessage("Id must be valid UUID"),

  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string.")
    .isLength({ min: 20, max: 60 })
    .withMessage("Name must be between 20 and 60 characters."),

  body("email")
    .optional()
    .isString()
    .withMessage("Email must be a string.")
    .isEmail()
    .withMessage("Invalid email address."),

  body("password")
    .optional()
    .isString()
    .withMessage("Password must be a string.")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be 8–16 characters long.")
    .matches(/[A-Z]/)
    .withMessage("Password must include at least one uppercase letter.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must include at least one special character."),

  body("address")
    .optional()
    .isString()
    .withMessage("Address must be a string.")
    .isLength({ max: 400 })
    .withMessage("Address must be at most 400 characters long."),
];

export const deleteUserValidation = [
  param("id")
    .isString()
    .withMessage("User ID must be a string.")
    .notEmpty()
    .withMessage("User id is required.")
    .isUUID()
    .withMessage("User id must be valid UUID."),
];
