import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

import { TRANSACTIONS } from '../mock';
import { TransactionType } from '../models';
import { FieldErrors } from '../types';

interface TransactionBody {
  contactId: number;
  type: TransactionType;
  amount: number;
  dateTime: number;
  note?: string;
  description?: string;
}

export const getAccountTransactions: RequestHandler = (req, res, next) => {
  const accountId = +req.params.accountId;

  res.status(200)
    .json({
      transactions: TRANSACTIONS.getTransactionsOfAccount(accountId)
    });
};

export const getContactTransactions: RequestHandler = (req, res, next) => {
  const contactId = +req.params.contactId;
  const accountId = +req.params.accountId;

  if (!contactId) {
    return res.status(400)
      .json({
        errors: {
          id: 'Contact Id not provided!',
        },
      });
  }

  res.status(200)
    .json({
      transactions: TRANSACTIONS.getTransactionsOfContact(contactId, accountId)
    });
};

export const getTransaction: RequestHandler = (req, res, next) => {
  const txnId = +req.params.id;
  const accountId = +req.params.accountId;
  // const contactId = +req.query.contactId!;

  // if (!contactId) {
  //   return res.status(400)
  //     .json({
  //       errors: {
  //         id: 'Contact Id not provided!',
  //       },
  //     });
  // }

  if (!txnId) {
    return res.status(400)
      .json({
        errors: {
          id: 'Transaction Id not provided!',
        },
      });
  }

  res.status(200)
    .json({ ...TRANSACTIONS.getTransactionOfContact(txnId, accountId) });
};

export const addTransaction: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages: FieldErrors = {};

    for (let error of errors.array()) {
      errorMessages[error.param] = error.msg;
    }

    return res.status(400).json({ errors: errorMessages });
  }

  const accountId = +req.params.accountId;
  const { contactId, type, amount, dateTime, note, description } = req.body as TransactionBody;

  res.status(201)
    .json({
      ...TRANSACTIONS.addNewTransaction(
        contactId,
        accountId,
        type,
        amount,
        dateTime,
        note,
        description,
      ),
    });
};

export const updateTransaction: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages: FieldErrors = {};

    for (let error of errors.array()) {
      errorMessages[error.param] = error.msg;
    }

    return res.status(400).json({ errors: errorMessages });
  }

  const id = +req.params.id;
  const accountId = +req.params.accountId;

  if (!id) {
    return res.status(400)
      .json({
        errors: {
          id: 'Transaction Id not provided!',
        },
      });
  }

  const {
    contactId,
    type,
    amount,
    dateTime,
    note,
    description
  } = req.body as TransactionBody;

  res.status(201)
    .json({
      ...TRANSACTIONS.updateTransaction(
        id,
        contactId,
        accountId,
        type,
        amount,
        dateTime,
        note,
        description,
      ),
    });
};

export const deleteTransaction: RequestHandler = (req, res, next) => {
  const txnId = +req.params.id;
  const accountId = +req.params.accountId;

  if (!txnId) {
    return res.status(400)
      .json({
        errors: {
          id: 'Transaction Id not provided!',
        },
      });
  }

  res.status(200).json({ success: TRANSACTIONS.deleteTransaction(txnId, accountId) });
};

export const getContactTransactionSummary: RequestHandler = (req, res, next) => {
  const accountId = +req.params.accountId;
  const contactId = +req.params.id;

  if (!contactId) {
    return res.status(400)
      .json({
        errors: {
          id: 'Contact Id not provided!',
        },
      });
  }

  res.status(200)
    .json({ ...TRANSACTIONS.getTransactionSummaryOfContact(contactId, accountId) });
};

export const getAccountTransactionSummary: RequestHandler = (req, res, next) => {
  const accountId = +req.params.accountId;

  res.status(200)
    .json({ ...TRANSACTIONS.getTransactionsSummaryOfAccount(accountId) });
};