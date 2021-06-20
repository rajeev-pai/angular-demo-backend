import { Router } from 'express';
import { body } from 'express-validator';

import { auth } from '../middleware';
import {
  getContactTransactions,
  getTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getContactTransactionSummary,
  getAccountTransactionSummary,
  getAccountTransactions,
} from '../controllers/transactions';
import { TransactionType } from '../models';

const router = Router();

router.get('/', auth, getAccountTransactions);
router.get('/account-summary', auth, getAccountTransactionSummary);

router.get('/of/:contactId', auth, getContactTransactions);

router.post(
  '/new',
  auth,
  body('contactId')
    .isNumeric()
    .withMessage('Invalid contact Id!')
    .custom(value => {
      if (!value) {
        throw new Error('This field is required!');
      }

      return true;
    }),
  body('type')
    .isNumeric()
    .withMessage('Invalid type!')
    .isIn([
      TransactionType.OWES_YOU,
      TransactionType.YOU_OWE,
    ])
    .withMessage('Invalid type!')
    .custom(value => {
      if (value === undefined) {
        throw new Error('This field is required!');
      }

      return true;
    }),
  body('amount')
    .isNumeric()
    .withMessage('Invalid amount')
    .custom(value => {
      if (!value) {
        throw new Error('This field is required!');
      }

      if (value < 0) {
        throw new Error('This field cannot contain negative values!');
      }

      return true;
    }),
  body('dateTime')
    .isNumeric()
    .withMessage('Invalid date time!')
    .custom(value => {
      if (!value) {
        throw new Error('This field is required!');
      }

      return true;
    }),
  addTransaction,
);

router.patch(
  '/:id',
  auth,
  // body('id')
  //   .isNumeric()
  //   .withMessage('Invalid transaction Id!')
  //   .custom(value => {
  //     if (!value) {
  //       throw new Error('This field is required!');
  //     }

  //     return true;
  //   }),
  body('contactId')
    .isNumeric()
    .withMessage('Invalid contact Id!')
    .custom(value => {
      if (!value) {
        throw new Error('This field is required!');
      }

      return true;
    }),
  body('type')
    .isNumeric()
    .withMessage('Invalid type!')
    .isIn([
      TransactionType.OWES_YOU,
      TransactionType.YOU_OWE,
    ])
    .withMessage('Invalid type!')
    .custom(value => {
      if (value === undefined) {
        throw new Error('This field is required!');
      }

      return true;
    }),
  body('amount')
    .isNumeric()
    .withMessage('Invalid amount')
    .custom(value => {
      if (value === undefined) {
        throw new Error('This field is required!');
      }

      if (value < 0) {
        throw new Error('This field cannot contain negative values!');
      }

      return true;
    }),
  body('dateTime')
    .isNumeric()
    .withMessage('Invalid date time!')
    .custom(value => {
      if (!value) {
        throw new Error('This field is required!');
      }

      return true;
    }),
  updateTransaction,
);

router.delete('/:id', auth, deleteTransaction);
router.get('/contact-summary/:id', auth, getContactTransactionSummary);
router.get('/:id', auth, getTransaction);

export default router;