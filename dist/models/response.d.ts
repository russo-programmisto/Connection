import { Request } from "./request";
export interface ResponseData {
    headers?: {
        [id: string]: string;
    };
    data?: any;
    status: number;
}
export declare const isResponseData: (obj: any) => obj is ResponseData;
export interface Response extends ResponseData {
    request: Request;
}
export declare const isResponse: (obj: any) => obj is Response;
