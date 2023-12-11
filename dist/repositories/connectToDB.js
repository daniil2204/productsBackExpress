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
exports.runDB = exports.client = void 0;
const mongodb_1 = require("mongodb");
const mongoURL = process.env.MONGOURL ||
    "mongodb+srv://cultofpersonality654:catChizik@cluster0.7fwpaol.mongodb.net/";
exports.client = new mongodb_1.MongoClient(mongoURL);
const runDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.client.connect();
        yield exports.client.db("samyraiBack").command({ ping: 1 });
        console.log("Connect was succesfully");
    }
    catch (_a) {
        console.log("Connect was not succesfully");
        yield exports.client.close();
    }
});
exports.runDB = runDB;
