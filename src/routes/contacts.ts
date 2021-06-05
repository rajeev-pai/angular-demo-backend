import { Router } from 'express';
import { body } from 'express-validator';

import { auth } from '../middleware'
import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts';

const router = Router();

router.get('/', auth, getContacts);
router.get('/:id', auth, getContact);

router.post(
  '/create',
  auth,
  body('firstName')
    .custom(value => {
      if (!value) {
        throw new Error('This field is required!');
      }

      return true;
    }),
  body('lastName')
    .custom(value => {
      if (!value) {
        throw new Error('This field is required!');
      }

      return true;
    }),
  body('email')
    .isEmail()
    .withMessage('Invalid email!')
    .custom(value => {
      if (!value) {
        throw new Error('This field is required!');
      }

      return true;
    }),
  createContact,
);

router.patch(
  '/update',
  body('id')
    .isNumeric()
    .withMessage('Invalid Id')
    .custom(value => {
      if (!value) {
        throw new Error('This field is required!');
      }

      return true;
    }),
  body('firstName')
    .custom(value => {
      if (!value) {
        throw new Error('This field is required!');
      }

      return true;
    }),
  body('lastName')
    .custom(value => {
      if (!value) {
        throw new Error('This field is required!');
      }

      return true;
    }),
  body('email')
    .isEmail()
    .withMessage('Invalid email!')
    .custom(value => {
      if (!value) {
        throw new Error('This field is required!');
      }

      return true;
    }),
  auth,
  updateContact
);

router.delete('/:id', auth, deleteContact);

export default router;