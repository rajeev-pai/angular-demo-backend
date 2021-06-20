"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var accounts_1 = require("../controllers/accounts");
var mock_1 = require("../mock");
var middleware_1 = require("../middleware");
var router = express_1.Router();
router.get('/', middleware_1.auth, accounts_1.getAccountDetails);
router.get('/username-availability', accounts_1.checkUsernameAvailability);
router.post('/create', express_validator_1.body('email')
    .isEmail()
    .withMessage('Invalid email!')
    .custom(function (value) {
    if (!value) {
        throw new Error('This field is required!');
    }
    if (mock_1.ACCOUNTS.isEmailTaken(value)) {
        throw new Error('Email is already in use!');
    }
    return true;
}), express_validator_1.body('password')
    .isLength({ min: 6 })
    .withMessage('Password needs to be atleast 6 characters long!')
    .custom(function (value) {
    if (!value) {
        throw new Error('This field is required!');
    }
    return true;
}), express_validator_1.body('confirmPassword')
    .custom(function (value) {
    if (!value) {
        throw new Error('This field is required!');
    }
    return true;
}), express_validator_1.body('username')
    .notEmpty()
    .withMessage('Username cannot be blank!')
    .custom(function (value) {
    if (!value) {
        throw new Error('This field is required!');
    }
    if (mock_1.ACCOUNTS.isUsernameTaken(value)) {
        throw new Error('Username already taken!');
    }
    return true;
}), accounts_1.createAccount);
router.post('/login', accounts_1.loginToAccount);
router.get('/auth-check', middleware_1.auth, function (req, res, next) {
    res.status(200).json({ auth: true });
});
exports.default = router;
