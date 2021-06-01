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
exports.loginToAccount = exports.createAccount = void 0;
var express_validator_1 = require("express-validator");
var mock_1 = require("../mock");
var util_1 = require("../util");
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
    var _b = req.body, email = _b.email, password = _b.password, username = _b.username;
    var account = mock_1.ACCOUNTS.addNewAccount(email, password, username);
    if (account) {
        res.status(201).json({ data: account });
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
var loginToAccount = function (req, res, next) {
    var _a = req.body, username = _a.username, password = _a.password;
    var account = mock_1.ACCOUNTS.login(username, password);
    if (account) {
        account.latestToken = util_1.createJWT(account.getSharableInfo());
        return res.status(200).json({
            data: __assign(__assign({}, account.getSharableInfo()), { token: account.latestToken }),
        });
    }
    return res.status(200).json({
        errors: {
            message: "Invalid login credentials!",
        }
    });
};
exports.loginToAccount = loginToAccount;
