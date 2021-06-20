"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var middleware_1 = require("../middleware");
var transactions_1 = require("../controllers/transactions");
var models_1 = require("../models");
var router = express_1.Router();
router.get('/', middleware_1.auth, transactions_1.getAccountTransactions);
router.get('/account-summary', middleware_1.auth, transactions_1.getAccountTransactionSummary);
router.get('/of/:contactId', middleware_1.auth, transactions_1.getContactTransactions);
router.post('/new', middleware_1.auth, express_validator_1.body('contactId')
    .isNumeric()
    .withMessage('Invalid contact Id!')
    .custom(function (value) {
    if (!value) {
        throw new Error('This field is required!');
    }
    return true;
}), express_validator_1.body('type')
    .isNumeric()
    .withMessage('Invalid type!')
    .isIn([
    models_1.TransactionType.OWES_YOU,
    models_1.TransactionType.YOU_OWE,
])
    .withMessage('Invalid type!')
    .custom(function (value) {
    if (value === undefined) {
        throw new Error('This field is required!');
    }
    return true;
}), express_validator_1.body('amount')
    .isNumeric()
    .withMessage('Invalid amount')
    .custom(function (value) {
    if (!value) {
        throw new Error('This field is required!');
    }
    if (value < 0) {
        throw new Error('This field cannot contain negative values!');
    }
    return true;
}), express_validator_1.body('dateTime')
    .isNumeric()
    .withMessage('Invalid date time!')
    .custom(function (value) {
    if (!value) {
        throw new Error('This field is required!');
    }
    return true;
}), transactions_1.addTransaction);
router.patch('/:id', middleware_1.auth, express_validator_1.body('contactId')
    .isNumeric()
    .withMessage('Invalid contact Id!')
    .custom(function (value) {
    if (!value) {
        throw new Error('This field is required!');
    }
    return true;
}), express_validator_1.body('type')
    .isNumeric()
    .withMessage('Invalid type!')
    .isIn([
    models_1.TransactionType.OWES_YOU,
    models_1.TransactionType.YOU_OWE,
])
    .withMessage('Invalid type!')
    .custom(function (value) {
    if (value === undefined) {
        throw new Error('This field is required!');
    }
    return true;
}), express_validator_1.body('amount')
    .isNumeric()
    .withMessage('Invalid amount')
    .custom(function (value) {
    if (value === undefined) {
        throw new Error('This field is required!');
    }
    if (value < 0) {
        throw new Error('This field cannot contain negative values!');
    }
    return true;
}), express_validator_1.body('dateTime')
    .isNumeric()
    .withMessage('Invalid date time!')
    .custom(function (value) {
    if (!value) {
        throw new Error('This field is required!');
    }
    return true;
}), transactions_1.updateTransaction);
router.delete('/:id', middleware_1.auth, transactions_1.deleteTransaction);
router.get('/contact-summary/:id', middleware_1.auth, transactions_1.getContactTransactionSummary);
router.get('/:id', middleware_1.auth, transactions_1.getTransaction);
exports.default = router;
