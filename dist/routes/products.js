"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const index_1 = require("../middlewares/validation/index");
const productsService_1 = require("../domain/productsService");
const index_2 = require("../utils/index");
const index_3 = require("../utils/index");
const { OK_200, CREATED_201, NO_CONTENT_204, BAD_REQUEST_400, NOT_FOUND_404 } = index_2.HTTP_STATUSES;
exports.productsRouter = (0, express_1.Router)();
exports.productsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqQueryTitle = req.query.title;
    const foundProducts = yield productsService_1.productsService
        .findProducts(reqQueryTitle ? reqQueryTitle : null)
        .then((data) => data.map((product) => (0, index_3.returnProductToClient)(product)));
    if (reqQueryTitle) {
        res.status(OK_200).send(foundProducts);
    }
    else {
        res.send(foundProducts);
    }
}));
exports.productsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqParamsProductID = req.params.id;
    const foundProductByID = yield productsService_1.productsService
        .findProductByID(reqParamsProductID)
        .then((data) => (data ? (0, index_3.returnProductToClient)(data) : null));
    if (foundProductByID) {
        res.send(foundProductByID);
    }
    else {
        res.sendStatus(NOT_FOUND_404);
    }
}));
exports.productsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqParamsID = req.params.id;
    const deletedMessage = yield productsService_1.productsService.deleteProductByID(reqParamsID);
    const deleteStatus = {
        msg: deletedMessage
            ? "Product was deleted"
            : "Product with this id doesn't exist",
    };
    res.status(OK_200).send(deleteStatus);
}));
exports.productsRouter.post("/", index_1.productFieldsValidation, index_1.errorsHandler, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, count, price } = req.body;
    const newProduct = yield productsService_1.productsService
        .createProduct({
        title,
        count,
        price,
    })
        .then((data) => (0, index_3.returnProductToClient)(data));
    res.status(CREATED_201).send(newProduct);
}));
exports.productsRouter.put("/:id", index_1.productFieldsValidation, index_1.errorsHandler, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqParamsID = req.params.id;
    const { title, count, price } = req.body;
    const changeProduct = yield productsService_1.productsService
        .changeProductByID(reqParamsID, {
        title,
        count,
        price,
    })
        .then((data) => (data ? (0, index_3.returnProductToClient)(data) : null));
    if (changeProduct) {
        res.status(CREATED_201).send(changeProduct);
    }
    else {
        res.send(NOT_FOUND_404);
    }
}));
