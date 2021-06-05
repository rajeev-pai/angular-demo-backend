"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var middleware_1 = require("../middleware");
var contacts_1 = require("../controllers/contacts");
var router = express_1.Router();
router.get('/', middleware_1.auth, contacts_1.getContacts);
router.get('/:id', middleware_1.auth, contacts_1.getContact);
router.post('/create', middleware_1.auth, express_validator_1.body('firstName')
    .custom(function (value) {
    if (!value) {
        throw new Error('This field is required!');
    }
    return true;
}), express_validator_1.body('lastName')
    .custom(function (value) {
    if (!value) {
        throw new Error('This field is required!');
    }
    return true;
}), express_validator_1.body('email')
    .isEmail()
    .withMessage('Invalid email!')
    .custom(function (value) {
    if (!value) {
        throw new Error('This field is required!');
    }
    return true;
}), contacts_1.createContact);
router.patch('/update', express_validator_1.body('id')
    .isNumeric()
    .withMessage('Invalid Id')
    .custom(function (value) {
    if (!value) {
        throw new Error('This field is required!');
    }
    return true;
}), express_validator_1.body('firstName')
    .custom(function (value) {
    if (!value) {
        throw new Error('This field is required!');
    }
    return true;
}), express_validator_1.body('lastName')
    .custom(function (value) {
    if (!value) {
        throw new Error('This field is required!');
    }
    return true;
}), express_validator_1.body('email')
    .isEmail()
    .withMessage('Invalid email!')
    .custom(function (value) {
    if (!value) {
        throw new Error('This field is required!');
    }
    return true;
}), middleware_1.auth, contacts_1.updateContact);
router.delete('/:id', middleware_1.auth, contacts_1.deleteContact);
exports.default = router;
