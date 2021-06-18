import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

import { CONTACTS } from '../mock';
import { FieldErrors } from '../types';

interface CreateContactBody {
  firstName: string;
  lastName: string;
  email: string;
}

interface UpdateContactBody {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export const getContacts: RequestHandler = (req, res, next) => {
  const accountId = +req.params.accountId;

  res.status(200)
    .json({ contacts: CONTACTS.getContactsOfAccount(accountId) });
};

export const getContact: RequestHandler = (req, res, next) => {
  const accountId = +req.params.accountId;
  const contactId = +req.params.id;
  const contact = CONTACTS.getContactById(contactId, accountId);

  res.status(200).json(contact ? { ...contact } : null);
};

export const createContact: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages: FieldErrors = {};

    for (let error of errors.array()) {
      errorMessages[error.param] = error.msg;
    }

    return res.status(400).json({ errors: errorMessages });
  }

  const accountId = +req.params.accountId;
  const { firstName, lastName, email } = req.body as CreateContactBody;

  const contact = CONTACTS.addNewContact(firstName, lastName, email, accountId);

  if (!contact) {
    res.status(400)
      .json({
        errors: {
          duplicate: 'Duplicate contact!',
        },
      });
  }

  res.status(200).json({ ...contact });
};

export const updateContact: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages: FieldErrors = {};

    for (let error of errors.array()) {
      errorMessages[error.param] = error.msg;
    }

    return res.status(400).json({ errors: errorMessages });
  }

  const accountId = +req.params.accountId;
  const { id, firstName, lastName, email } = req.body as UpdateContactBody;

  res.status(200).json({
    ...CONTACTS.updateContact(id, firstName, lastName, email, accountId),
  });
};

export const deleteContact: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages: FieldErrors = {};

    for (let error of errors.array()) {
      errorMessages[error.param] = error.msg;
    }

    return res.status(400).json({ errors: errorMessages });
  }

  const accountId = +req.params.accountId;
  const contactId = +req.params.id;

  if (!contactId) {
    return res.status(400)
      .json({
        errors: {
          id: 'Contact Id not provided!'
        }
      });
  }

  res.status(200)
    .json({ success: CONTACTS.removeContactById(contactId, accountId) });
};
