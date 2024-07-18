import { body, param, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import User from "../models/UserModel.js";
import mongoose from "mongoose";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(400).json({ msg: errorMessages.join(", ") });
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("title").notEmpty().withMessage("Title is required!"),
  body("company").notEmpty().withMessage("Company is required!"),
]);

export const validateIdParam = withValidationErrors([
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid MongoDB id!"),
]);

export const validateRegisterInput = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("Username is required to register")
    .custom(async (username) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new BadRequestError("Username already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required!!")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
]);

export const validateLoginInput = withValidationErrors([
  body("username").notEmpty().withMessage("Username is required!!"),
  body("password").notEmpty().withMessage("Password is required!!"),
]);
