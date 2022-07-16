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
exports.ConnectionClient = void 0;
const socket_io_client_1 = require("socket.io-client");
const response_1 = require("../models/response");
const event_1 = require("../types/event");
const uuid_1 = require("uuid");
class ConnectionClient {
    constructor(configuration) {
        this.configuration = configuration;
        this.requests = [];
        this.connect = () => {
            this.socket.connect();
        };
        this.disconnect = () => {
            this.socket.disconnect();
        };
        this.send = (data) => __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.sendRequestWithCallback({
                    data,
                    responseHandler: response => resolve(response)
                });
            });
        });
        this.sendRequestWithCallback = (configuration) => {
            const requestIdentifier = `${uuid_1.v4()}-${Date.now()}`;
            const request = Object.assign({ id: requestIdentifier }, configuration.data);
            this.requests.push({
                id: requestIdentifier,
                responseHandler: configuration.responseHandler
            });
            this.socket.emit(event_1.ConnectionEvent.request, request);
        };
        const socket = socket_io_client_1.io(configuration.url, {
            transports: ["websocket"],
            autoConnect: false
        });
        socket.on("connect", () => {
            this.configuration.onConnected && this.configuration.onConnected();
        });
        socket.on("disconnect", () => {
            this.configuration.onDisconnected && this.configuration.onDisconnected();
        });
        socket.on(event_1.ConnectionEvent.response, response => {
            if (response_1.isResponse(response)) {
                const index = this.requests.findIndex(el => el.id === response.request.id);
                if (0 <= index && index < this.requests.length) {
                    this.requests[index].responseHandler(response);
                    this.requests.splice(index, 1);
                }
            }
        });
        this.socket = socket;
    }
}
exports.ConnectionClient = ConnectionClient;
