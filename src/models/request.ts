import { isRequestMethod, RequestMethod } from "../types/request-method";

export interface RequestData {
    url: string,
    method: RequestMethod,
    headers?: {[id: string]: string},
    data?: {[id: string]: any} | []
}

export const isRequestData = (obj: any): obj is RequestData => {
    if (typeof obj === "object") {
        const requirements = [
            typeof obj.url === "string",
            isRequestMethod(obj.method),
            "headers" in obj ? typeof obj.headers === "object" : true,
            "data" in obj ? typeof obj.data === "object" : true
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}

export interface Request extends RequestData {
    id: string
}

export const isRequest = (obj: any): obj is Request => {
    if (isRequestData(obj)) {
        const requirements = [
            "id" in obj && typeof obj["id"] === "string"
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}