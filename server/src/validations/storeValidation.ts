import { body, param, query } from "express-validator";

export const createStoreValidation = [
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
    .withMessage("Email must be a valid email address."),

  body("address")
    .isString()
    .withMessage("Address must be a string.")
    .notEmpty()
    .withMessage("Address is required.")
    .isLength({ max: 400 })
    .withMessage("Address must be at most 400 characters."),

  body("ownerId")
    .isString()
    .withMessage("Owner ID must be a string.")
    .notEmpty()
    .withMessage("Owner ID is required.")
    .isUUID()
    .withMessage("Owner ID must be a valid UUID."),
];

export const getStoreValidation = [
  query("name")
    .optional()
    .isString()
    .withMessage("Name must be a string.")
    .notEmpty()
    .withMessage("Name cannot be empty."),

  query("email")
    .optional()
    .isString()
    .withMessage("Email must be a string.")
    .notEmpty()
    .withMessage("Email cannot be empty.")
    .isEmail()
    .withMessage("Email must be valid."),

  query("address")
    .optional()
    .isString()
    .withMessage("Address must be a string.")
    .notEmpty()
    .withMessage("Address cannot be empty."),
];

export const getStoreByIdValidation = [
  param("id")
    .isString()
    .withMessage("Store ID must be a string.")
    .notEmpty()
    .withMessage("Store ID is required.")
    .isUUID()
    .withMessage("Store Id must be valid UUID"),
];

export const updateStoreValidation = [
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
    .withMessage("Email must be valid."),

  body("address")
    .optional()
    .isString()
    .withMessage("Address must be a string.")
    .isLength({ max: 400 })
    .withMessage("Address must be at most 400 characters."),
];

export const deleteStoreValidation = [
  param("id")
    .isString()
    .withMessage("Store ID must be a string.")
    .notEmpty()
    .withMessage("Store ID is required.")
    .isUUID()
    .withMessage("Store Id must be valid UUID"),
];
