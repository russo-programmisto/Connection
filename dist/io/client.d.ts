import { RequestData } from "../models/request";
import { Response } from "../models/response";
export declare class ConnectionClient {
    private readonly configuration;
    private socket;
    private requests;
    constructor(configuration: ConnectionClientConfiguration);
    connect: () => void;
    disconnect: () => void;
    send: (data: RequestData) => Promise<Response>;
    private sendRequestWithCallback;
}
export interface ConnectionClientConfiguration {
    url: string;
    onConnected?: () => void;
    onDisconnected?: () => void;
}
