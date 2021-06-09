import { Contact } from '../models';
import { TRANSACTIONS } from './transactions';

class Contacts {
  private lastCreatedContactId = 0;
  private contacts: Contact[] = [];

  constructor() {
    this.addNewContact('Tommy', 'Vercetti', 'tommy@email.com', 1);
    this.addNewContact('James', 'Bond', 'bond.james@email.com', 1);
    this.addNewContact('Ethan', 'Hunt', 'ethan.hunt@email.com', 2);
    this.addNewContact('Kate', 'Beckett', 'kate.beck@email.com', 1);
    this.addNewContact('Carles', 'Puyol', 'puyol@email.com', 2);
  }

  addNewContact(
    firstName: string,
    lastName: string,
    email: string,
    accountId: number,
  ) {
    if (this.checkIfExistingContact(email, accountId).isDuplicate) {
      return null;
    }

    this.lastCreatedContactId += 1;
    const contact = new Contact(this.lastCreatedContactId, email, firstName, lastName, accountId);
    this.contacts.push(contact);
    return contact;
  }

  getContactsOfAccount(accountId: number) {
    return this.contacts
      .filter(contact => contact.accountId === accountId)
      .map(contact => {
        const contactTransactions = TRANSACTIONS
          .getTransactionSummaryOfContact(contact.id, accountId);

        return {
          ...contact,
          ...contactTransactions,
        };
      });
  }

  getContactById(id: number, accountId: number) {
    const contact = this.contacts.find(c => (
      (c.id === id) && (c.accountId === accountId)
    ));

    if (!contact) {
      return null;
    }

    return {
      ...contact,
      ...TRANSACTIONS
        .getTransactionSummaryOfContact(contact.id, accountId),
    }
  }

  removeContactById(id: number, accountId: number) {
    const index = this.contacts.findIndex(contact => ((contact.id === id) && (contact.accountId === accountId)));

    if (index !== -1) {
      this.contacts.splice(index, 1);
      return true;
    }

    return false;
  }

  updateContact(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    accountId: number,
  ) {
    const index = this.contacts.findIndex(contact => {
      return (contact.id === id) && (contact.accountId === accountId);
    });

    if (index !== -1) {
      const existingContact = this.checkIfExistingContact(email, accountId);

      if (existingContact.isDuplicate && (existingContact.index !== index)) {
        return null;
      }

      this.contacts[index].updateDetails(firstName, lastName, email);
      return this.contacts[index];
    }

    return null;
  }

  private checkIfExistingContact(email: string, accountId: number) {
    const index = this.contacts.findIndex(contact => {
      return (
        (contact.email.toLowerCase() === email.toLowerCase())
        && (contact.accountId === accountId)
      );
    })

    return {
      index,
      isDuplicate: (index !== -1)
    };
  }
}

export const CONTACTS = new Contacts();