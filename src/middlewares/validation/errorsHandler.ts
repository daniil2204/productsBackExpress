import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { HTTP_STATUSES } from "../../utils";

export const errorsHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    console.log("i am here");
    res.status(HTTP_STATUSES.BAD_REQUEST_400).send({ errors: erros.array() });
  } else {
    next();
  }
};
