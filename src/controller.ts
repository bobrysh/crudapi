// eslint-disable-next-line import/extensions
/* eslint-disable import/extensions */
import type { IncomingMessage } from 'http';
import type { Model } from './model';
import { Messages } from './settings';
import {
  parseRequestBody,
  ageValidCheck,
  hobbyValidCheck,
  stringValidCheck,
} from './helper';

export class Controller {
  constructor(private model: Model) {
    this.model = model;
  }

  async newUser(req: any, res: any): Promise<any> {
    let user: any;
    try {
      user = await parseRequestBody(req);
    } catch (error) {
      this.createResponse(res, 500, { message: Messages.InternalError });
      return;
    }
    if (
      stringValidCheck(user.username)
      && ageValidCheck(user.age)
      && hobbyValidCheck(user.hobbies)
    ) {
      let newUser: any;
      try {
        newUser = await this.model.newUser(user);
        this.createResponse(res, 201, newUser);
      } catch (error) {
        this.createResponse(res, 500, { message: Messages.InternalError });
      }
    } else {
      this.createResponse(res, 400, { message: Messages.notEnoughData });
    }
  }

  async deleteUser(res: any, id: any) {
    try {
      await this.model.deleteUser(id);
      this.createResponse(res, 204, { message: Messages.userDeleted });
    } catch (error) {
      this.createResponse(res, 500, { message: Messages.InternalError });
    }
    throw new Error('Method not implemented.');
  }

  async updateUser(req: IncomingMessage, res: any, id: any) {
    let user: any;
    try {
      user = await parseRequestBody(req);
    } catch (error) {
      this.createResponse(res, 500, { message: Messages.InternalError });
      return;
    }
    try {
      const updatedUser: any = await this.model.updateUser(user, id);
      this.createResponse(res, 200, updatedUser);
    } catch (error) {
      this.createResponse(res, 500, { message: Messages.InternalError });
    }
  }

  async getAllInfo(res: any): Promise<void> {
    let data: any[] = [];
    try {
      data = await this.model.getdata();
      this.createResponse(res, 200, data);
    } catch (error) {
      this.createResponse(res, 500, { message: Messages.InternalError });
    }
  }

  async getUser(res: any, id: any): Promise<void> {
    try {
      const {user} = await this.model.getUser(id);
      this.createResponse(res, 200, user);
    } catch (error) {
      this.createResponse(res, 500, { message: Messages.InternalError });
    }
  }

  createResponse(res: any, statusCode: number, payload: any): void {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payload));
  }

  empty(res: any): void {
    this.createResponse(res, 404, { message: Messages.empty });
  }

  invalidUserId(res: any): void {
    this.createResponse(res, 400, { message: Messages.invalidId });
  }
}
