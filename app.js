"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var accounts_1 = __importDefault(require("./routes/accounts"));
var contacts_1 = __importDefault(require("./routes/contacts"));
var transactions_1 = __importDefault(require("./routes/transactions"));
var app = express_1.default();
app.use(body_parser_1.json());
app.use('/api/accounts', accounts_1.default);
app.use('/api/contacts', contacts_1.default);
app.use('/api/transactions', transactions_1.default);
app.use(function (err, req, res, next) {
    res.status(500).json({ message: err.message });
});
app.listen(3000);
