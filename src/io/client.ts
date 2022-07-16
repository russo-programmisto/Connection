import { io, Socket } from "socket.io-client";
import { Request, RequestData } from "../models/request";
import { isResponse, Response } from "../models/response";
import { ConnectionEvent } from "../types/event";
import { v4 as uuidv4, v4 } from "uuid";

export class ConnectionClient {

    private socket: Socket

    private requests: {
        id: string,
        responseHandler: (response: Response) => void
    }[] = []

    constructor(
        private readonly configuration: ConnectionClientConfiguration
    ) {
        const socket = io(
            configuration.url,
            {
                transports: ["websocket"],
                autoConnect: false
            }
        );
        socket.on(
            "connect",
            () => {
                this.configuration.onConnected && this.configuration.onConnected();
            }
        );
        socket.on("disconnect", () => {
            this.configuration.onDisconnected && this.configuration.onDisconnected();
        });
        socket.on(
            ConnectionEvent.response,
            response => {
                if (isResponse(response)) {
                    const index = this.requests.findIndex(el => el.id === response.request.id);

                    if (0 <= index && index < this.requests.length) {
                        this.requests[index].responseHandler(
                            response
                        );
                        this.requests.splice(index, 1);
                    }
                }
            }
        );
        this.socket = socket;
    }

    public connect = () => {
        this.socket.connect();
    }

    public disconnect = () => {
        this.socket.disconnect();
    }

    public send = async (
        data: RequestData
    ): Promise<Response> => {
        return new Promise(resolve => {
            this.sendRequestWithCallback({
                data,
                responseHandler: response => resolve(response)
            });
        });
    }

    private sendRequestWithCallback = (
        configuration: {
            data: RequestData,
            responseHandler: (response: Response) => void
        }
    ) => {
        const requestIdentifier = `${v4()}-${Date.now()}`;
        const request: Request = {
            id: requestIdentifier,
            ...configuration.data
        };
        this.requests.push({
            id: requestIdentifier,
            responseHandler: configuration.responseHandler
        });
        this.socket.emit(
            ConnectionEvent.request,
            request
        );
    }
}

export interface ConnectionClientConfiguration {
    url: string,
    onConnected?: () => void,
    onDisconnected?: () => void
}