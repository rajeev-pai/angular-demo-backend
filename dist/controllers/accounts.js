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
exports.getAccountDetails = exports.loginToAccount = exports.checkUsernameAvailability = exports.createAccount = void 0;
var express_validator_1 = require("express-validator");
var mock_1 = require("../mock");
var createAccount = function (req, res, next) {
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        var errorMessages = {};
        for (var _i = 0, _a = errors.array(); _i < _a.length; _i++) {
            var error = _a[_i];
            errorMessages[error.param] = error.msg;
        }
        return res.status(400).json({ errors: errorMessages });
    }
    var _b = req.body, email = _b.email, password = _b.password, confirmPassword = _b.confirmPassword, username = _b.username;
    if (password !== confirmPassword) {
        return res.status(400)
            .json({
            errors: {
                confirmPassword: 'Passwords don\'t match!',
            },
        });
    }
    var account = mock_1.ACCOUNTS.addNewAccount(email, password, username);
    if (account) {
        res.status(201).json(__assign({}, account));
    }
    else {
        res.status(200).json({
            errors: {
                message: 'Failed to create account!',
            },
        });
    }
};
exports.createAccount = createAccount;
var checkUsernameAvailability = function (req, res, next) {
    var username = req.query.username;
    if (!username) {
        return res.status(400).json({
            error: {
                message: 'No username provided!',
            },
        });
    }
    res.status(200)
        .json({ available: !mock_1.ACCOUNTS.isUsernameTaken(username) });
};
exports.checkUsernameAvailability = checkUsernameAvailability;
var loginToAccount = function (req, res, next) {
    var _a = req.body, username = _a.username, password = _a.password;
    var account = mock_1.ACCOUNTS.login(username, password);
    if (account) {
        return res.status(200).json(__assign({}, account));
    }
    return res.status(400).json({
        errors: {
            message: "Invalid login credentials!",
        }
    });
};
exports.loginToAccount = loginToAccount;
var getAccountDetails = function (req, res, next) {
    var accountId = +req.params.accountId;
    res.status(200)
        .json(__assign({}, mock_1.ACCOUNTS.getAccountDetails(accountId)));
};
exports.getAccountDetails = getAccountDetails;
