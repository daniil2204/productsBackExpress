"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testsRoutes = void 0;
const express_1 = require("express");
const data_1 = require("../db/data");
exports.testsRoutes = (0, express_1.Router)();
exports.testsRoutes.delete("/", (req, res) => {
    data_1.data.products = [];
    res.sendStatus(201);
});
