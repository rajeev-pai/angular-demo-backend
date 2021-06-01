"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.createJWT = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var SECRET = 'moneymanager';
var createJWT = function (payload) {
    return jsonwebtoken_1.sign(payload, SECRET);
};
exports.createJWT = createJWT;
var verifyJWT = function (token) {
    return new Promise(function (resolve, reject) {
        jsonwebtoken_1.verify(token, SECRET, function (err, decoded) {
            if (decoded) {
                resolve(decoded);
            }
            reject('Invalid token!');
        });
    });
};
exports.verifyJWT = verifyJWT;
