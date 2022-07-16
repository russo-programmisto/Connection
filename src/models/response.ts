import { isRequest, Request } from "./request";

export interface ResponseData {
    headers?: {[id: string]: string},
    data?: any,
    status: number
}

export const isResponseData = (obj: any): obj is ResponseData => {
    if (typeof obj === "object") {
        const requirements = [
            "headers" in obj ? typeof obj["headers"] === "object" : true,
            "data" in obj ? typeof obj["data"] === "object" : true,
            typeof obj["status"] === "number"
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}

export interface Response extends ResponseData {
    request: Request
}

export const isResponse = (obj: any): obj is Response => {
    if (isResponseData(obj)) {
        const requirements = [
            "request" in obj && isRequest(obj["request"])
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}