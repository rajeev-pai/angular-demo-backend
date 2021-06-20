"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountTransactionSummary = exports.getContactTransactionSummary = exports.deleteTransaction = exports.updateTransaction = exports.addTransaction = exports.getTransaction = exports.getContactTransactions = exports.getAccountTransactions = void 0;
var express_validator_1 = require("express-validator");
var mock_1 = require("../mock");
var getAccountTransactions = function (req, res, next) {
    var accountId = +req.params.accountId;
    res.status(200)
        .json({
        transactions: mock_1.TRANSACTIONS.getTransactionsOfAccount(accountId)
    });
};
exports.getAccountTransactions = getAccountTransactions;
var getContactTransactions = function (req, res, next) {
    var contactId = +req.params.contactId;
    var accountId = +req.params.accountId;
    if (!contactId) {
        return res.status(400)
            .json({
            errors: {
                id: 'Contact Id not provided!',
            },
        });
    }
    res.status(200)
        .json({
        transactions: mock_1.TRANSACTIONS.getTransactionsOfContact(contactId, accountId)
    });
};
exports.getContactTransactions = getContactTransactions;
var getTransaction = function (req, res, next) {
    var txnId = +req.params.id;
    var accountId = +req.params.accountId;
    if (!txnId) {
        return res.status(400)
            .json({
            errors: {
                id: 'Transaction Id not provided!',
            },
        });
    }
    res.status(200)
        .json(__assign({}, mock_1.TRANSACTIONS.getTransactionOfContact(txnId, accountId)));
};
exports.getTransaction = getTransaction;
var addTransaction = function (req, res, next) {
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        var errorMessages = {};
        for (var _i = 0, _a = errors.array(); _i < _a.length; _i++) {
            var error = _a[_i];
            errorMessages[error.param] = error.msg;
        }
        return res.status(400).json({ errors: errorMessages });
    }
    var accountId = +req.params.accountId;
    var _b = req.body, contactId = _b.contactId, type = _b.type, amount = _b.amount, dateTime = _b.dateTime, note = _b.note, description = _b.description;
    res.status(201)
        .json(__assign({}, mock_1.TRANSACTIONS.addNewTransaction(contactId, accountId, type, amount, dateTime, note, description)));
};
exports.addTransaction = addTransaction;
var updateTransaction = function (req, res, next) {
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        var errorMessages = {};
        for (var _i = 0, _a = errors.array(); _i < _a.length; _i++) {
            var error = _a[_i];
            errorMessages[error.param] = error.msg;
        }
        return res.status(400).json({ errors: errorMessages });
    }
    var id = +req.params.id;
    var accountId = +req.params.accountId;
    if (!id) {
        return res.status(400)
            .json({
            errors: {
                id: 'Transaction Id not provided!',
            },
        });
    }
    var _b = req.body, contactId = _b.contactId, type = _b.type, amount = _b.amount, dateTime = _b.dateTime, note = _b.note, description = _b.description;
    res.status(201)
        .json(__assign({}, mock_1.TRANSACTIONS.updateTransaction(id, contactId, accountId, type, amount, dateTime, note, description)));
};
exports.updateTransaction = updateTransaction;
var deleteTransaction = function (req, res, next) {
    var txnId = +req.params.id;
    var accountId = +req.params.accountId;
    if (!txnId) {
        return res.status(400)
            .json({
            errors: {
                id: 'Transaction Id not provided!',
            },
        });
    }
    res.status(200).json({ success: mock_1.TRANSACTIONS.deleteTransaction(txnId, accountId) });
};
exports.deleteTransaction = deleteTransaction;
var getContactTransactionSummary = function (req, res, next) {
    var accountId = +req.params.accountId;
    var contactId = +req.params.id;
    if (!contactId) {
        return res.status(400)
            .json({
            errors: {
                id: 'Contact Id not provided!',
            },
        });
    }
    res.status(200)
        .json(__assign({}, mock_1.TRANSACTIONS.getTransactionSummaryOfContact(contactId, accountId)));
};
exports.getContactTransactionSummary = getContactTransactionSummary;
var getAccountTransactionSummary = function (req, res, next) {
    var accountId = +req.params.accountId;
    res.status(200)
        .json(__assign({}, mock_1.TRANSACTIONS.getTransactionsSummaryOfAccount(accountId)));
};
exports.getAccountTransactionSummary = getAccountTransactionSummary;
