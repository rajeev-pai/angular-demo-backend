"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCOUNTS = void 0;
var models_1 = require("../models");
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
        return index !== -1;
    };
    Accounts.prototype.isEmailTaken = function (email) {
        var index = this.accounts.findIndex(function (account) {
            return account.email.toLowerCase() === email.toLowerCase();
        });
        return index !== -1;
    };
    Accounts.prototype.login = function (username, password) {
        return this.accounts.find(function (acc) { return acc.checkLogin(username, password); });
    };
    Accounts.prototype.checkIfExistingAccount = function (email, username) {
        var index = this.accounts.findIndex(function (account) {
            return ((account.username.toLowerCase() === username.toLowerCase())
                || (account.email.toLowerCase() === email.toLowerCase()));
        });
        return index !== -1;
    };
    return Accounts;
}());
exports.ACCOUNTS = new Accounts();
