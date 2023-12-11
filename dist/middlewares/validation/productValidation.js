"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productFieldsValidation = void 0;
const express_validator_1 = require("express-validator");
exports.productFieldsValidation = [
    (0, express_validator_1.body)("title").isString().trim().isLength({ min: 3, max: 20 }),
    (0, express_validator_1.body)("count").isNumeric(),
    (0, express_validator_1.body)("price").isNumeric(),
];
