import { Response, Router } from "express";

import {
  errorsHandler,
  productFieldsValidation,
} from "../middlewares/validation/index";

import {
  RequestWithBody,
  RequestWithParams,
  RequestWithQuery,
  RequestWithParamsAndBody,
} from "../types";

import {
  ProductCreateModel,
  ProductUpdateModel,
  ProductGetQueryModel,
  ProductViewModel,
  URIParamsProductID,
} from "../models/index";

import { productsService } from "../domain/productsService";
import { HTTP_STATUSES } from "../utils/index";

import { returnProductToClient } from "../utils/index";

const { OK_200, CREATED_201, NO_CONTENT_204, BAD_REQUEST_400, NOT_FOUND_404 } =
  HTTP_STATUSES;

export const productsRouter = Router();

productsRouter.get(
  "/",
  async (
    req: RequestWithQuery<ProductGetQueryModel>,
    res: Response<ProductViewModel[]>
  ) => {
    const reqQueryTitle = req.query.title;
    const foundProducts = await productsService
      .findProducts(reqQueryTitle ? reqQueryTitle : null)
      .then((data) => data.map((product) => returnProductToClient(product)));

    if (reqQueryTitle) {
      res.status(OK_200).send(foundProducts);
    } else {
      res.send(foundProducts);
    }
  }
);

productsRouter.get(
  "/:id",
  async (
    req: RequestWithParams<URIParamsProductID>,
    res: Response<ProductViewModel>
  ) => {
    const reqParamsProductID = req.params.id;
    const foundProductByID = await productsService
      .findProductByID(reqParamsProductID)
      .then((data) => (data ? returnProductToClient(data) : null));
    if (foundProductByID) {
      res.send(foundProductByID);
    } else {
      res.sendStatus(NOT_FOUND_404);
    }
  }
);

productsRouter.delete(
  "/:id",
  async (req: RequestWithParams<URIParamsProductID>, res: Response<Object>) => {
    const reqParamsID = req.params.id;
    const deletedMessage = await productsService.deleteProductByID(reqParamsID);
    const deleteStatus = {
      msg: deletedMessage
        ? "Product was deleted"
        : "Product with this id doesn't exist",
    };
    res.status(OK_200).send(deleteStatus);
  }
);

productsRouter.post(
  "/",
  productFieldsValidation,
  errorsHandler,
  async (
    req: RequestWithBody<ProductCreateModel>,
    res: Response<ProductViewModel>
  ) => {
    const { title, count, price } = req.body;
    const newProduct = await productsService
      .createProduct({
        title,
        count,
        price,
      })
      .then((data) => returnProductToClient(data));
    res.status(CREATED_201).send(newProduct);
  }
);

productsRouter.put(
  "/:id",
  productFieldsValidation,
  errorsHandler,
  async (
    req: RequestWithParamsAndBody<URIParamsProductID, ProductUpdateModel>,
    res: Response<ProductViewModel | number>
  ) => {
    const reqParamsID = req.params.id;
    const { title, count, price } = req.body;
    const changeProduct = await productsService
      .changeProductByID(reqParamsID, {
        title,
        count,
        price,
      })
      .then((data) => (data ? returnProductToClient(data) : null));
    if (changeProduct) {
      res.status(CREATED_201).send(changeProduct);
    } else {
      res.send(NOT_FOUND_404);
    }
  }
);
