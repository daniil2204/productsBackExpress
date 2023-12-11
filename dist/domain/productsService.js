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
exports.productsService = void 0;
const productsRepository_1 = require("../repositories/productsRepository");
exports.productsService = {
    findProducts(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return productsRepository_1.productsRepository.findProducts(title);
        });
    },
    findProductByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productsRepository_1.productsRepository.findProductByID(id);
        });
    },
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, price, count } = product;
            const newProduct = {
                id: `${+new Date()}`,
                title: `${title}`,
                price: price,
                count: count,
            };
            return yield productsRepository_1.productsRepository.createProduct(newProduct);
        });
    },
    changeProductByID(id, changeParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productsRepository_1.productsRepository.changeProductByID(id, changeParams);
        });
    },
    deleteProductByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productsRepository_1.productsRepository.deleteProductByID(id);
        });
    },
};
