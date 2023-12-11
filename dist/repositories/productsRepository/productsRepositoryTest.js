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
exports.productsRepositoryTest = void 0;
const connectToDB_1 = require("../../db/connectToDB");
exports.productsRepositoryTest = {
    findProducts(title) {
        return __awaiter(this, void 0, void 0, function* () {
            if (title) {
                return connectToDB_1.testsCollection.find({ title: { $regex: title } }).toArray();
            }
            else {
                return connectToDB_1.testsCollection.find().toArray();
            }
        });
    },
    findProductByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield connectToDB_1.testsCollection.findOne({ id: id });
            if (product) {
                return product;
            }
            else {
                return null;
            }
        });
    },
    createProduct(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connectToDB_1.testsCollection.insertOne(newProduct);
            return newProduct;
        });
    },
    changeProductByID(id, changeParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, count, price } = changeParams;
            const product = yield connectToDB_1.testsCollection.updateOne({ id: id }, { $set: { title, price, count } });
            return product.matchedCount === 1 ? Object.assign(Object.assign({}, changeParams), { id }) : null;
        });
    },
    deleteProductByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield connectToDB_1.testsCollection.deleteOne({ id: id })).deletedCount === 1;
        });
    },
};
