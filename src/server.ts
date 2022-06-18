import type { Controller } from './controller';
import 'dotenv/config';
import http from 'http';
import { Endpoit, regular } from './settings';
import { parseId } from './helper';

export class Server {
  private _port: string | number;
  constructor(private controller: Controller) {
    this.controller = controller;
    this._port = process.env['PORT'] || 5000;
  }

  init() {
    http
      .createServer((req, res) => {
        const id: string = parseId(req.url);
        if (
          !req.url?.startsWith(Endpoit.users) ||
          req.url.split('/').length > 4
        ) {
          this.controller.empty(res);
        } 
        else if (!id.match(regular)) {
          this.controller.invalidUserId(res);
        }
        else if (req.method === 'POST') {
          this.controller.newUser(req, res);
        } 
        else if (req.method === 'GET' && req.url === Endpoit.users) {
          this.controller.getAllInfo(res);
        }  
        else if (req.method === 'PUT' && id) {
          this.controller.updateUser(req, res, id);
        }
        else if (req.method === 'GET' && id) {
          this.controller.getUser(res, id);
        }  
        else if (req.method === 'DELETE' && id) {
          this.controller.deleteUser(res, id);
        } 
        else {
          this.controller.empty(res);
        }
      })
      .listen(this._port, () => {
        console.log(`Server is running on port ${this._port}`);
      });
  }

  get port() {
    return this._port;
  }
}
