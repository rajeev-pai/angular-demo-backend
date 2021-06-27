"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.TransactionType = void 0;
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["YOU_OWE"] = 0] = "YOU_OWE";
    TransactionType[TransactionType["OWES_YOU"] = 1] = "OWES_YOU";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
var Transaction = (function () {
    function Transaction(id, accountId, contactId, type, amount, dateTime, note, description) {
        if (note === void 0) { note = ''; }
        if (description === void 0) { description = ''; }
        this.id = id;
        this.accountId = accountId;
        this.contactId = contactId;
        this.type = type;
        this.amount = amount;
        this.dateTime = dateTime;
        this.note = note;
        this.description = description;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    }
    Transaction.prototype.updateDetails = function (contactId, type, amount, dateTime, note, description) {
        if (note === void 0) { note = ''; }
        if (description === void 0) { description = ''; }
        this.contactId = contactId;
        this.type = type;
        this.amount = amount;
        this.dateTime = dateTime;
        this.note = note;
        this.description = description;
    };
    return Transaction;
}());
exports.Transaction = Transaction;
