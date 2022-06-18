import { Controller } from "./controller";
import { Model } from "./model";
import { Server } from "./server";

const model = new Model();
const controller = new Controller(model)
const server = new Server(controller)
server.init();
