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
    // console.warn(req, res)

    let user: any;
    try {
      user = await parseRequestBody(req);
    } catch (error) {
      Controller.createResponse(res, 500, { message: Messages.InternalError });
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
        Controller.createResponse(res, 201, newUser);
      } catch (error) {
        Controller.createResponse(res, 500, { message: Messages.InternalError });
      }
    } else {
      Controller.createResponse(res, 400, { message: Messages.notEnoughData });
    }
  }

  async deleteUser(res: any, id: any) {
    // console.warn( res)

    try {
      await this.model.deleteUser(id);
      Controller.createResponse(res, 204, { message: Messages.userDeleted });
    } catch (error) {
      Controller.createResponse(res, 500, { message: Messages.InternalError });
    }
    throw new Error('Method not implemented.');
  }

  async updateUser(req: IncomingMessage, res: any, id: any) {
    // console.warn(req, res)

    let user: any;
    try {
      user = await parseRequestBody(req);
    } catch (error) {
      Controller.createResponse(res, 500, { message: Messages.InternalError });
      return;
    }
    try {
      const updatedUser: any = await this.model.updateUser(user, id);
      Controller.createResponse(res, 200, updatedUser);
    } catch (error) {
      Controller.createResponse(res, 500, { message: Messages.InternalError });
    }
  }

  async getAllInfo(res: any): Promise<void> {
    // console.warn(res)
    let data: any[] = [];
    try {
      data = await this.model.getdata();
      Controller.createResponse(res, 200, data);
    } catch (error) {
      Controller.createResponse(res, 500, { message: Messages.InternalError });
    }
  }

  async getUser(res: any, id: any): Promise<void> {
    // console.warn(id, res)

    try {
      const {user} = await this.model.getUser(id);
      Controller.createResponse(res, 200, user);
    } catch (error) {
      Controller.createResponse(res, 500, { message: Messages.InternalError });
    }
  }

  static createResponse(res: any, statusCode: number, payload: any): void {
    // console.warn(payload, res)

    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payload));
  }

  static empty(res: any): void {
    // console.warn( res)
    
    Controller.createResponse(res, 404, { message: Messages.empty });
  }

  static invalidUserId(res: any): void {
    // console.warn( res)

    Controller.createResponse(res, 400, { message: Messages.invalidId });
  }
}
