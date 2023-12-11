import { body } from "express-validator";

export const productFieldsValidation = [
  body("title").isString().trim().isLength({ min: 3, max: 20 }),
  body("count").isNumeric(),
  body("price").isNumeric(),
];
