import { database } from './defaultData';
import { v4 as uuidv4 } from 'uuid';

export class Model {
  private data: any[];
  constructor() {
    this.data = [...database];
  }

  getdata(): Promise<any[]> {
    return new Promise((resolve) => {
      resolve(this.data);
    });
  }

  getUser(id: string): Promise<any> {
    console.warn(this.data);
    
    return new Promise((resolve) => {
      let i: number = -1;
      const user = this.data.filter((record, index) => {
        if (record.id === id) {
          i = index;
          return true
        } else {
          return false;
        }
      });
      resolve({user: user[0] || {}, index: i});
    });
  }

  newUser(user: any): Promise<any> {
    console.warn(user);

    return new Promise((resolve) => {
      const exUser: any = { id: uuidv4(), ...user };
      this.data.push(exUser);
      resolve(exUser);
    });
  }

  deleteUser(id: string): Promise<void> {
    console.warn(id);

    return new Promise((resolve) => {
      this.data = this.data.filter((record) => record.id !== id);
      resolve();
    });
  }

  updateUser(user: any, id: string): Promise<any> {
    console.warn(user,id);

    return new Promise(async (resolve) => {
      const record = await this.getUser(id);
      const exUser: any = { ...record.user as any, ...user };
      this.data[record.index] = exUser;
      resolve(exUser);
    });
  }
}
