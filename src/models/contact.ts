export class Contact {
  createdAt: number;
  updatedAt: number;
  
  constructor(
    public id: number,
    public email: string,
    public firstName: string,
    public lastName: string,
    public accountId: number,
  ) {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  updateDetails(firstName: string, lastName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.updatedAt = Date.now();
  }
}