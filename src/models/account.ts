export interface SharableAccountInfo {
  id: number;
  username: string;
  email: string;
}

export class Account {
  createdAt: number;
  updatedAt: number;

  constructor(
    public id: number,
    public email: string,
    private password: string,
    public username: string,
    private token: string = '',
  ) {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  checkLogin(username: string, password: string) {
    return ((this.username === username) && (this.password === password));
  }

  getSharableInfo(): SharableAccountInfo {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
    };
  }

  get latestToken() {
    return this.token;
  }

  set latestToken(token: string) {
    this.updatedAt = Date.now();
    this.token = token;
  }
}
