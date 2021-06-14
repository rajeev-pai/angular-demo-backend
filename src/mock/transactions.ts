import { Transaction, TransactionType } from '../models/transaction';

class Transactions {
  private lastCreatedContactId = 0;
  private transactions: Transaction[] = [];

  constructor() {
    this.addNewTransaction(1, 1, TransactionType.OWES_YOU, 10000, Date.now());
    this.addNewTransaction(1, 1, TransactionType.OWES_YOU, 1000, Date.now());
    this.addNewTransaction(1, 1, TransactionType.OWES_YOU, 300000, Date.now());
    this.addNewTransaction(2, 1, TransactionType.YOU_OWE, 100, Date.now(), 'Lunch', 'Biriyani from Somewhere');
    this.addNewTransaction(2, 1, TransactionType.YOU_OWE, 5000, Date.now());
    this.addNewTransaction(2, 1, TransactionType.YOU_OWE, 100, Date.now());
  }

  addNewTransaction(
    contactId: number,
    accountId: number,
    type: TransactionType,
    amount: number,
    dateTime: number,
    note = '',
    description = '',
  ) {
    this.lastCreatedContactId += 1;
    const transaction = new Transaction(
      this.lastCreatedContactId,
      accountId,
      contactId,
      type,
      amount,
      dateTime,
      note,
      description
    );

    this.transactions.push(transaction);
    return transaction;
  }

  updateTransaction(
    id: number,
    contactId: number,
    accountId: number,
    type: TransactionType,
    amount: number,
    dateTime: number,
    note = '',
    description = '',
  ) {
    const transaction = this.transactions.find(txn => {
      return ((txn.id === id) && (txn.accountId === accountId) && (txn.contactId === contactId));
    });

    if (!transaction) {
      return null;
    }

    transaction.updateDetails(type, amount, dateTime, note, description);
    return transaction;
  }

  getTransactionsOfContact(contactId: number, accountId: number) {
    return this.transactions.filter(txn => (txn.contactId === contactId) && (txn.accountId === accountId));
  }

  getTransactionOfContact(id: number, contactId: number, accountId: number) {
    return this.transactions.find(txn => (
      (txn.id === id)
      && (txn.contactId === contactId)
      && (txn.accountId === accountId)
    ));
  }

  getTransactionSummaryOfContact(contactId: number, accountId: number) {
    let youOwe = 0;
    let owesYou = 0;

    this.transactions.forEach(txn => {
      if ((txn.contactId === contactId) && (txn.accountId === accountId)) {
        switch (txn.type) {
          case TransactionType.OWES_YOU:
            owesYou += txn.amount;
            break;

          case TransactionType.YOU_OWE:
            youOwe += txn.amount;
            break;
        }
      }
    });

    return { youOwe, owesYou };
  }

  getTransactionsSummaryOfAccount(accountId: number) {
    let youOwe = 0;
    let owesYou = 0;

    this.transactions.forEach(txn => {
      if (txn.accountId === accountId) {
        switch (txn.type) {
          case TransactionType.OWES_YOU:
            owesYou += txn.amount;
            break;

          case TransactionType.YOU_OWE:
            youOwe += txn.amount;
            break;
        }
      }
    });

    return { youOwe, owesYou };
  }

  deleteTransaction(id: number, accountId: number) {
    const index = this.transactions.findIndex(txn => {
      return ((txn.id === id) && (txn.accountId === accountId));
    });

    if (index !== -1) {
      this.transactions.splice(index, 1);
      return true;
    }

    return false;
  }

  deleteTransactionsOfContact(contactId: number, accountId: number) {
    this.transactions = this.transactions.filter(txn => (txn.contactId !== contactId) && (txn.accountId !== accountId));
  }
}

export const TRANSACTIONS = new Transactions();