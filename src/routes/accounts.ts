import { Router } from 'express';
import { body } from 'express-validator';

import {
  createAccount,
  loginToAccount,
  checkUsernameAvailability,
  getAccountDetails,
  updateAccountDetails,
} from '../controllers/accounts';
import { ACCOUNTS } from '../mock';
import { auth } from '../middleware';

const router = Router();

router.get('/', auth, getAccountDetails);
router.get('/username-availability', checkUsernameAvailability);

router.post(
  '/create',
  // Validate email
  body('email')
    .isEmail()
    .withMessage('Invalid email!')
    .custom(value => {
      if (!value) {
        throw new Error('This field is required!');
      }

      if (ACCOUNTS.isEmailTaken(value)) {
        throw new Error('Email is already in use!');
      }

      return true;
    }),
  // Validate password
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password needs to be atleast 6 characters long!')
    .custom(value => {
      if (!value) {
        throw new Error('This field is required!');
      }

      return true;
    }),
  body('confirmPassword')
    .custom(value => {
      if (!value) {
        throw new Error('This field is required!');
      }

      return true;
    }),
  body('username')
    .notEmpty()
    .withMessage('Username cannot be blank!')
    .custom(value => {
      if (!value) {
        throw new Error('This field is required!');
      }

      if (ACCOUNTS.isUsernameTaken(value).taken) {
        throw new Error('Username already taken!');
      }

      return true;
    }),
  createAccount
);

router.patch('/', auth, updateAccountDetails);

router.post('/login', loginToAccount);

router.get('/auth-check', auth, (req, res, next) => {
  res.status(200).json({ auth: true });
});

export default router;
