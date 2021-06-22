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
exports.ACCOUNTS = void 0;
var models_1 = require("../models");
var util_1 = require("../util");
var Accounts = (function () {
    function Accounts() {
        this.lastCreatedAccountId = 0;
        this.accounts = [];
        this.addNewAccount('test@email.com', 'test123456', 'test');
        this.addNewAccount('courage@email.com', 'courage123456', 'courage');
    }
    Accounts.prototype.addNewAccount = function (email, password, username) {
        if (this.checkIfExistingAccount(email, username)) {
            return null;
        }
        this.lastCreatedAccountId += 1;
        var newAccount = new models_1.Account(this.lastCreatedAccountId, email, password, username);
        this.accounts.push(newAccount);
        return newAccount.getSharableInfo();
    };
    Accounts.prototype.updateAccountUsername = function (accountId, username) {
        var index = this.accounts.findIndex(function (acc) { return acc.id === accountId; });
        var usernameStatus = this.isUsernameTaken(username);
        if (usernameStatus.taken && (usernameStatus.index !== index)) {
            return null;
        }
        var account = this.accounts[index];
        account.username = username;
        return __assign({}, account.getSharableInfo());
    };
    Accounts.prototype.removeAccount = function (id) {
        var index = this.accounts.findIndex(function (account) { return account.id === id; });
        if (index !== -1) {
            this.accounts.splice(index, 1);
            return true;
        }
        return false;
    };
    Accounts.prototype.isUsernameTaken = function (username) {
        var index = this.accounts.findIndex(function (account) {
            return account.username.toLowerCase() === username.toLowerCase();
        });
        return {
            taken: index !== -1,
            index: index
        };
    };
    Accounts.prototype.isEmailTaken = function (email) {
        var index = this.accounts.findIndex(function (account) {
            return account.email.toLowerCase() === email.toLowerCase();
        });
        return index !== -1;
    };
    Accounts.prototype.login = function (username, password) {
        var account = this.accounts
            .find(function (acc) { return acc.checkLogin(username, password); });
        if (account) {
            this.createTokenIfNotExist(account);
            return __assign(__assign({}, account.getSharableInfo()), { token: account.latestToken });
        }
        return null;
    };
    Accounts.prototype.getAccountDetails = function (accountId) {
        var account = this.accounts.find(function (acc) { return acc.id === accountId; });
        if (account) {
            return account.getSharableInfo();
        }
        return null;
    };
    Accounts.prototype.checkIfExistingAccount = function (email, username) {
        var index = this.accounts.findIndex(function (account) {
            return ((account.username.toLowerCase() === username.toLowerCase())
                || (account.email.toLowerCase() === email.toLowerCase()));
        });
        return index !== -1;
    };
    Accounts.prototype.createTokenIfNotExist = function (account) {
        if (!account.latestToken) {
            account.latestToken = util_1.createJWT(account.getSharableInfo());
        }
    };
    return Accounts;
}());
exports.ACCOUNTS = new Accounts();
