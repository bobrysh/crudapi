import 'dotenv/config';
import http from 'http';
import { Endpoit } from './settings';
import { isValidId, parseId } from './helper';
import { Controller } from './controller';

export class Server {
  private readonly _port: string | number;
  constructor(private controller: Controller) {
    this._port = process.env['PORT'] || 1000;
    this.controller = controller;

    // console.log(`Server is running on port ${this._port}`);
  }

  init() {
    // console.log('Server is running');
    
    http
      .createServer((request, response) => {
        const id: string = parseId(request.url);
        if (
          !request.url?.startsWith(Endpoit.users) ||
          request.url.split('/').length > 4
        ) {
          Controller.empty(response);
        } 
        else if (!isValidId(id)) {
          console.log('id',id)
          Controller.invalidUserId(response);
        }
        else if (request.method === 'POST') {
          this.controller.newUser(request, response);
        } 
        else if (request.method === 'GET' && (request.url === Endpoit.users || request.url === `${Endpoit.users}/`)) {
          this.controller.getAllInfo(response).then();
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
          Controller.empty(response);
        }
        if (process.send) {
          process.send({ pid: process.pid });
        }
      })
      .listen(this._port, () => {
        console.log(`Server is running on port ${this._port}`);
      });
  }

  // get port() {
  //   // console.log(`Server is running on port ${this._port}`);
    
  //   return this._port;
  // }
}
