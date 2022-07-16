/// <reference types="node" />
import { Server } from "socket.io";
import http from "http";
import https from "https";
import { Request } from "../models/request";
import { ResponseData } from "../models/response";
export declare class ConnectionServer {
    private readonly configuration;
    readonly socketIO_server: Server;
    private _connectedClientIdentifiers;
    get connectedClientIdentifiers(): string[];
    constructor(configuration: ConnectionServerConfiguration);
}
export interface ConnectionServerConfiguration {
    httpServer: http.Server | https.Server;
    onConnected?: (data: {
        id: string;
    }) => void;
    onDisconnected?: (data: {
        id: string;
    }) => void;
    onRequest: (data: {
        request: Request;
    }) => Promise<ResponseData>;
}
