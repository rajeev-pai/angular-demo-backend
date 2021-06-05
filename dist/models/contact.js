"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
var Contact = (function () {
    function Contact(id, email, firstName, lastName, accountId) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.accountId = accountId;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    }
    Contact.prototype.updateDetails = function (firstName, lastName, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.updatedAt = Date.now();
    };
    return Contact;
}());
exports.Contact = Contact;
