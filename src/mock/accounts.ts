import { Account } from '../models';
import { createJWT } from '../util';

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

  updateAccountUsername(accountId: number, username: string) {
    const index = this.accounts.findIndex(acc => acc.id === accountId);
    const usernameStatus = this.isUsernameTaken(username);

    if (usernameStatus.taken && (usernameStatus.index !== index)) {
      return null;
    }

    const account = this.accounts[index];
    account.username = username;
    return { ...account.getSharableInfo() };
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

    return {
      taken: index !== -1,
      index
    };
  }

  isEmailTaken(email: string) {
    const index = this.accounts.findIndex(account => {
      return account.email.toLowerCase() === email.toLowerCase();
    });
    return index !== -1;
  }

  login(username: string, password: string) {
    const account = this.accounts
      .find(acc => acc.checkLogin(username, password));

    if (account) {
      this.createTokenIfNotExist(account);

      return {
        ...account.getSharableInfo(),
        token: account.latestToken,
      };
    }

    return null;
  }

  getAccountDetails(accountId: number) {
    const account = this.accounts.find(acc => acc.id === accountId);

    if (account) {
      return account.getSharableInfo();
    }

    return null;
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

  private createTokenIfNotExist(account: Account) {
    if (!account.latestToken) {
      account.latestToken = createJWT(account.getSharableInfo());
    }
  }
}

export const ACCOUNTS = new Accounts();
