import { body } from "express-validator";
import Bicycle from "../models/Bicycle.js";

export const createBicycleValidation = [
    body("id")
        .isNumeric()
        .withMessage("ID should be a number")
        .notEmpty()
        .withMessage("ID is required"),

    body("name")
        .isLength({ min: 5 })
        .withMessage("Name should be at least 5 characters")
        .notEmpty()
        .withMessage("Name is required"),

    body("type")
        .isLength({ min: 5 })
        .withMessage("Type should be at least 5 characters")
        .notEmpty()
        .withMessage("Type is required"),

    body("color")
        .isLength({ min: 5 })
        .withMessage("Color should be at least 5 characters")
        .notEmpty()
        .withMessage("Color is required"),

    body("wheelSize")
        .isNumeric()
        .withMessage("Wheel size should be a number")
        .notEmpty()
        .withMessage("Wheel size is required"),

    body("price")
        .isNumeric()
        .withMessage("Price should be a number")
        .notEmpty()
        .withMessage("Price is required"),

    body("description")
        .isLength({ min: 5 })
        .withMessage("Description should be at least 5 characters")
        .notEmpty()
        .withMessage("Description is required"),

    body("id")
        .custom(async (value) => {
            const bicycle = await Bicycle.findOne({ id: value });
            if (bicycle) {
                throw new Error("ID must be unique");
            }
            return true;
    }),

];
