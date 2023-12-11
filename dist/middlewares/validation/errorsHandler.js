"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsHandler = void 0;
const express_validator_1 = require("express-validator");
const utils_1 = require("../../utils");
const errorsHandler = (req, res, next) => {
    const erros = (0, express_validator_1.validationResult)(req);
    if (!erros.isEmpty()) {
        console.log("i am here");
        res.status(utils_1.HTTP_STATUSES.BAD_REQUEST_400).send({ errors: erros.array() });
    }
    else {
        next();
    }
};
exports.errorsHandler = errorsHandler;
