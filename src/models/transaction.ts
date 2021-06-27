export enum TransactionType {
  YOU_OWE,
  OWES_YOU,
}

export class Transaction {
  createdAt: number;
  updatedAt: number;

  constructor(
    public id: number,
    public accountId: number,
    public contactId: number,
    public type: TransactionType,
    public amount: number,
    public dateTime: number,
    public note = '',
    public description = '',
  ) {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  updateDetails(
    contactId: number,
    type: TransactionType,
    amount: number,
    dateTime: number,
    note = '',
    description = '',
  ) {
    this.contactId = contactId;
    this.type = type;
    this.amount = amount;
    this.dateTime = dateTime;
    this.note = note;
    this.description = description;
  }
}