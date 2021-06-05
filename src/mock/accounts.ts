import { Account } from '../models';

class Accounts {
  private lastCreatedAccountId = 0;
  private accounts: Account[] = [];

  constructor() {
    this.addNewAccount('test@email.com', 'test123456', 'test');
    this.addNewAccount('courage@email.com', 'courage123456', 'courage');
  }

  addNewAccount(email: string, password: string, username: string) {
    if (this.checkIfExistingAccount(email, username)) {
      return null;
    }

    this.lastCreatedAccountId += 1;
    const newAccount = new Account(
      this.lastCreatedAccountId,
      email,
      password,
      username,
    );

    this.accounts.push(newAccount);
    return newAccount.getSharableInfo();
  }

  removeAccount(id: number) {
    const index = this.accounts.findIndex(account => account.id === id);

    if (index !== -1) {
      this.accounts.splice(index, 1);
      return true;
    }

    return false;
  }

  isUsernameTaken(username: string) {
    const index = this.accounts.findIndex(account => {
      return account.username.toLowerCase() === username.toLowerCase();
    });
    return index !== -1;
  }

  isEmailTaken(email: string) {
    const index = this.accounts.findIndex(account => {
      return account.email.toLowerCase() === email.toLowerCase();
    });
    return index !== -1;
  }

  login(username: string, password: string) {
    return this.accounts.find(acc => acc.checkLogin(username, password));
  }

  private checkIfExistingAccount(email: string, username: string) {
    const index = this.accounts.findIndex(account => {
      return (
        (account.username.toLowerCase() === username.toLowerCase())
        || (account.email.toLowerCase() === email.toLowerCase())
      );
    });

    return index !== -1;
  }
}

export const ACCOUNTS = new Accounts();
