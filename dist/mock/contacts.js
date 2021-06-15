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
exports.CONTACTS = void 0;
var models_1 = require("../models");
var transactions_1 = require("./transactions");
var Contacts = (function () {
    function Contacts() {
        this.lastCreatedContactId = 0;
        this.contacts = [];
        this.addNewContact('Tommy', 'Vercetti', 'tommy@email.com', 1);
        this.addNewContact('James', 'Bond', 'bond.james@email.com', 1);
        this.addNewContact('Ethan', 'Hunt', 'ethan.hunt@email.com', 2);
        this.addNewContact('Kate', 'Beckett', 'kate.beck@email.com', 1);
        this.addNewContact('Carles', 'Puyol', 'puyol@email.com', 2);
    }
    Contacts.prototype.addNewContact = function (firstName, lastName, email, accountId) {
        if (this.checkIfExistingContact(email, accountId).isDuplicate) {
            return null;
        }
        this.lastCreatedContactId += 1;
        var contact = new models_1.Contact(this.lastCreatedContactId, email, firstName, lastName, accountId);
        this.contacts.push(contact);
        return __assign(__assign({}, contact), transactions_1.TRANSACTIONS
            .getTransactionSummaryOfContact(contact.id, accountId));
    };
    Contacts.prototype.getContactsOfAccount = function (accountId) {
        return this.contacts
            .filter(function (contact) { return contact.accountId === accountId; })
            .map(function (contact) {
            var contactTransactions = transactions_1.TRANSACTIONS
                .getTransactionSummaryOfContact(contact.id, accountId);
            return __assign(__assign({}, contact), contactTransactions);
        });
    };
    Contacts.prototype.getContactById = function (id, accountId) {
        var contact = this.contacts.find(function (c) { return ((c.id === id) && (c.accountId === accountId)); });
        if (!contact) {
            return null;
        }
        return __assign(__assign({}, contact), transactions_1.TRANSACTIONS
            .getTransactionSummaryOfContact(contact.id, accountId));
    };
    Contacts.prototype.removeContactById = function (id, accountId) {
        var index = this.contacts.findIndex(function (contact) { return ((contact.id === id) && (contact.accountId === accountId)); });
        if (index !== -1) {
            this.contacts.splice(index, 1);
            return true;
        }
        return false;
    };
    Contacts.prototype.updateContact = function (id, firstName, lastName, email, accountId) {
        var index = this.contacts.findIndex(function (contact) {
            return (contact.id === id) && (contact.accountId === accountId);
        });
        if (index !== -1) {
            var existingContact = this.checkIfExistingContact(email, accountId);
            if (existingContact.isDuplicate && (existingContact.index !== index)) {
                return null;
            }
            this.contacts[index].updateDetails(firstName, lastName, email);
            return this.contacts[index];
        }
        return null;
    };
    Contacts.prototype.checkIfExistingContact = function (email, accountId) {
        var index = this.contacts.findIndex(function (contact) {
            return ((contact.email.toLowerCase() === email.toLowerCase())
                && (contact.accountId === accountId));
        });
        return {
            index: index,
            isDuplicate: (index !== -1)
        };
    };
    return Contacts;
}());
exports.CONTACTS = new Contacts();
