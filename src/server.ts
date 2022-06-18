import type { Controller } from './controller';
import 'dotenv/config';
import http from 'http';
import { Endpoit, regular } from './settings';
import { parseId } from './helper';

export class Server {
  private _port: string | number;
  constructor(private controller: Controller) {
    this._port = process.env['PORT'] || 1000;
    this.controller = controller;

    console.log(`Server is running on port ${this._port}`);
  }

  init() {
    console.log('Server is running');
    
    http
      .createServer((request, response) => {
        const id: string = parseId(request.url);
        if (
          !request.url?.startsWith(Endpoit.users) ||
          request.url.split('/').length > 4
        ) {
          this.controller.empty(response);
        } 
        else if (!id.match(regular)) {
          this.controller.invalidUserId(response);
        }
        else if (request.method === 'POST') {
          this.controller.newUser(request, response);
        } 
        else if (request.method === 'GET' && request.url === Endpoit.users) {
          this.controller.getAllInfo(response);
        }  
        else if (request.method === 'PUT' && id) {
          this.controller.updateUser(request, response, id);
        }
        else if (request.method === 'GET' && id) {
          this.controller.getUser(response, id);
        }  
        else if (request.method === 'DELETE' && id) {
          this.controller.deleteUser(response, id);
        } 
        else {
          this.controller.empty(response);
        }
      })
      .listen(this._port, () => {
        console.log(`Server is running on port ${this._port}`);
      });
  }

  get port() {
    console.log(`Server is running on port ${this._port}`);
    
    return this._port;
  }
}
