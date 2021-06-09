import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

import { ACCOUNTS } from '../mock';
import { createJWT } from '../util';
import { FieldErrors } from '../types';

interface CreateAccountBody {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

interface LoginBody {
  username: string;
  password: string;
}

export const createAccount: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages: FieldErrors = {};

    for (let error of errors.array()) {
      errorMessages[error.param] = error.msg;
    }

    return res.status(400).json({ errors: errorMessages });
  }

  const {
    email,
    password,
    confirmPassword,
    username,
  } = req.body as CreateAccountBody;

  if (password !== confirmPassword) {
    return res.status(400)
      .json({
        errors: {
          confirmPassword: 'Passwords don\'t match!',
        },
      });
  }

  const account = ACCOUNTS.addNewAccount(email, password, username);

  if (account) {
    res.status(201).json({ ...account });
  } else {
    res.status(200).json({
      errors: {
        message: 'Failed to create account!',
      },
    });
  }
};

export const checkUsernameAvailability: RequestHandler = (req, res, next) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({
      error: {
        message: 'No username provided!',
      },
    });
  }

  res.status(200)
    .json({ available: !ACCOUNTS.isUsernameTaken(username as string) });
};

export const loginToAccount: RequestHandler = (req, res, next) => {
  const { username, password } = req.body as LoginBody;
  const account = ACCOUNTS.login(username, password);

  if (account) {
    account.latestToken = createJWT(account.getSharableInfo());

    return res.status(200).json({
      ...account.getSharableInfo(),
      token: account.latestToken,
    });
  }

  return res.status(400).json({
    errors: {
      message: "Invalid login credentials!",
    }
  });
};
