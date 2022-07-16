"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRequest = exports.isRequestData = void 0;
const request_method_1 = require("../types/request-method");
const isRequestData = (obj) => {
    if (typeof obj === "object") {
        const requirements = [
            typeof obj.url === "string",
            request_method_1.isRequestMethod(obj.method),
            "headers" in obj ? typeof obj.headers === "object" : true,
            "data" in obj ? typeof obj.data === "object" : true
        ];
        return !requirements.includes(false);
    }
    else {
        return false;
    }
};
exports.isRequestData = isRequestData;
const isRequest = (obj) => {
    if (exports.isRequestData(obj)) {
        const requirements = [
            "id" in obj && typeof obj["id"] === "string"
        ];
        return !requirements.includes(false);
    }
    else {
        return false;
    }
};
exports.isRequest = isRequest;
