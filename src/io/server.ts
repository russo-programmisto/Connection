import { Server } from "socket.io";
import http from "http";
import https from "https";
import { ConnectionEvent } from "../types/event";
import { isRequest, Request } from "../models/request";
import { Response, ResponseData } from "../models/response";

export class ConnectionServer {

    public readonly socketIO_server: Server

    private _connectedClientIdentifiers: string[] = []

    public get connectedClientIdentifiers() {
        return Array.from(
            this._connectedClientIdentifiers
        );
    }

    constructor(
        private readonly configuration: ConnectionServerConfiguration
    ) {
        const socketServer = new Server(
            configuration.httpServer,
            {
            }
        );
        socketServer.on(
            "connection",
            socket => {
                this.configuration.onConnected && this.configuration.onConnected({
                    id: socket.id
                });

                if (!this._connectedClientIdentifiers.includes(socket.id)) {
                    this._connectedClientIdentifiers.push(
                        socket.id
                    );
                }

                socket.on(
                    ConnectionEvent.request,
                    async request => {
                        if (isRequest(request)) {
                            const data = await configuration.onRequest({
                                request
                            });
                            const response: Response = {
                                request,
                                ...data
                            };
                            socket.emit(
                                ConnectionEvent.response,
                                response
                            );
                        }
                    }
                );

                socket.on(
                    "disconnect",
                    reason => {
                        this.configuration.onDisconnected && this.configuration.onDisconnected({
                            id: socket.id
                        });

                        const index = this._connectedClientIdentifiers.indexOf(
                            socket.id
                        );
                        
                        if (0 <= index && index < this._connectedClientIdentifiers.length) {
                            this._connectedClientIdentifiers.splice(index, 1);
                        }
                    }
                );
            }
        );
        this.socketIO_server = socketServer;
    }
}

export interface ConnectionServerConfiguration {
    httpServer: http.Server | https.Server,
    onConnected?: (
        data: {
            id: string
        }
    ) => void,
    onDisconnected?: (
        data: {
            id: string
        }
    ) => void,
    onRequest: (
        data: {
            request: Request
        }
    ) => Promise<ResponseData>
}