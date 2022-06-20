import { Controller } from "./controller";
import { Model } from "./model";
import { Server } from "./server";
const model = new Model();
// console.warn(model)

const controller = new Controller(model)
// console.warn(controller)

const server = new Server(controller)
// console.warn(server)

server.init();
