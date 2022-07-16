"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionServer = void 0;
const socket_io_1 = require("socket.io");
const event_1 = require("../types/event");
const request_1 = require("../models/request");
class ConnectionServer {
    constructor(configuration) {
        this.configuration = configuration;
        this._connectedClientIdentifiers = [];
        const socketServer = new socket_io_1.Server(configuration.httpServer, {});
        socketServer.on("connection", socket => {
            this.configuration.onConnected && this.configuration.onConnected({
                id: socket.id
            });
            if (!this._connectedClientIdentifiers.includes(socket.id)) {
                this._connectedClientIdentifiers.push(socket.id);
            }
            socket.on(event_1.ConnectionEvent.request, (request) => __awaiter(this, void 0, void 0, function* () {
                if (request_1.isRequest(request)) {
                    const data = yield configuration.onRequest({
                        request
                    });
                    const response = Object.assign({ request }, data);
                    socket.emit(event_1.ConnectionEvent.response, response);
                }
            }));
            socket.on("disconnect", reason => {
                this.configuration.onDisconnected && this.configuration.onDisconnected({
                    id: socket.id
                });
                const index = this._connectedClientIdentifiers.indexOf(socket.id);
                if (0 <= index && index < this._connectedClientIdentifiers.length) {
                    this._connectedClientIdentifiers.splice(index, 1);
                }
            });
        });
        this.socketIO_server = socketServer;
    }
    get connectedClientIdentifiers() {
        return Array.from(this._connectedClientIdentifiers);
    }
}
exports.ConnectionServer = ConnectionServer;
