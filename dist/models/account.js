"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
var Account = (function () {
    function Account(id, email, password, username, token) {
        if (token === void 0) { token = ''; }
        this.id = id;
        this.email = email;
        this.password = password;
        this.username = username;
        this.token = token;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    }
    Account.prototype.checkLogin = function (username, password) {
        return ((this.username === username) && (this.password === password));
    };
    Account.prototype.getSharableInfo = function () {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
        };
    };
    Object.defineProperty(Account.prototype, "latestToken", {
        get: function () {
            return this.token;
        },
        set: function (token) {
            this.updatedAt = Date.now();
            this.token = token;
        },
        enumerable: false,
        configurable: true
    });
    return Account;
}());
exports.Account = Account;
