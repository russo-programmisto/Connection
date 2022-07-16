import { RequestMethod } from "../types/request-method";
export interface RequestData {
    url: string;
    method: RequestMethod;
    headers?: {
        [id: string]: string;
    };
    data?: {
        [id: string]: any;
    } | [];
}
export declare const isRequestData: (obj: any) => obj is RequestData;
export interface Request extends RequestData {
    id: string;
}
export declare const isRequest: (obj: any) => obj is Request;
