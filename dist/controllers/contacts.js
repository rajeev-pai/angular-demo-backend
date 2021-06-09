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
exports.deleteContact = exports.updateContact = exports.createContact = exports.getContact = exports.getContacts = void 0;
var express_validator_1 = require("express-validator");
var mock_1 = require("../mock");
var getContacts = function (req, res, next) {
    var accountId = +req.params.accountId;
    res.status(200)
        .json({ contacts: mock_1.CONTACTS.getContactsOfAccount(accountId) });
};
exports.getContacts = getContacts;
var getContact = function (req, res, next) {
    var _a;
    var accountId = +req.params.accountId;
    var contactId = +req.params.id;
    var contact = (_a = mock_1.CONTACTS.getContactById(contactId, accountId)) !== null && _a !== void 0 ? _a : null;
    res.status(200).json(__assign({}, contact));
};
exports.getContact = getContact;
var createContact = function (req, res, next) {
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
    var _b = req.body, firstName = _b.firstName, lastName = _b.lastName, email = _b.email;
    var contact = mock_1.CONTACTS.addNewContact(firstName, lastName, email, accountId);
    if (!contact) {
        res.status(200)
            .json({
            errors: {
                duplicate: 'Duplicate contact!',
            },
        });
    }
    res.status(200).json(__assign({}, contact));
};
exports.createContact = createContact;
var updateContact = function (req, res, next) {
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
    var _b = req.body, id = _b.id, firstName = _b.firstName, lastName = _b.lastName, email = _b.email;
    res.status(200).json(__assign({}, mock_1.CONTACTS.updateContact(id, firstName, lastName, email, accountId)));
};
exports.updateContact = updateContact;
var deleteContact = function (req, res, next) {
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
    var contactId = +req.params.id;
    if (!contactId) {
        return res.status(400)
            .json({
            errors: {
                id: 'Contact Id not provided!'
            }
        });
    }
    res.status(200)
        .json({ success: mock_1.CONTACTS.removeContactById(contactId, accountId) });
};
exports.deleteContact = deleteContact;
