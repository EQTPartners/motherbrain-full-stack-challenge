"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = require("./router");
var PORT = 8080;
var app = express_1.default();
var router = new router_1.Router();
router.initialize();
app.use('/', router.router);
app.listen(PORT, function () { return console.log("Example app listening on port " + PORT + "!"); });
