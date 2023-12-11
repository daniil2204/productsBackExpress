"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnProductToClient = void 0;
const returnProductToClient = (product) => {
    return {
        id: product.id,
        title: product.title,
        price: product.price,
    };
};
exports.returnProductToClient = returnProductToClient;
