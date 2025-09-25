import { body, param, query } from "express-validator";

export const createRatingValidation = [
  body("value")
    .notEmpty()
    .withMessage("Rating value is required.")
    .toInt()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating value must be an integer between 1 and 5."),

  body("userId")
    .notEmpty()
    .withMessage("User ID is required.")
    .isUUID()
    .withMessage("User ID must be a valid UUID."),

  body("storeId")
    .notEmpty()
    .withMessage("Store ID is required.")
    .isUUID()
    .withMessage("Store ID must be a valid UUID."),
];

export const getRatingValidation = [
  query("storeId")
    .optional()
    .isString()
    .withMessage("Store ID must be a string.")
    .isUUID()
    .withMessage("Store ID must be a valid UUID."),

  query("userId")
    .optional()
    .isString()
    .withMessage("User ID must be a string.")
    .isUUID()
    .withMessage("User ID must be a valid UUID."),

  query("value")
    .optional()
    .toInt()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating value must be an integer between 1 and 5."),
];

export const getRatingByIdValidation = [
  param("id")
    .isString()
    .withMessage("Rating ID must be a string.")
    .notEmpty()
    .withMessage("Rating ID is required.")
    .isUUID()
    .withMessage("Rating Id must be valid UUID"),
];

export const updateRatingValidation = [
  param("id")
    .isString()
    .withMessage("Rating ID must be a string.")
    .notEmpty()
    .withMessage("Rating ID is required.")
    .isUUID()
    .withMessage("Rating Id must be valid UUID"),

  body("value")
    .notEmpty()
    .withMessage("Rating value is required.")
    .isNumeric()
    .withMessage("Rating value must be a number.")
    .custom((value) => value >= 1 && value <= 5)
    .withMessage("Rating value must be between 1 and 5."),
];

export const deleteRatingValidation = [
  param("id")
    .isString()
    .withMessage("Rating ID must be a string.")
    .notEmpty()
    .withMessage("Rating ID is required.")
    .isUUID()
    .withMessage("Rating Id must be valid UUID"),
];
