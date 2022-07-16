"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isResponse = exports.isResponseData = void 0;
const request_1 = require("./request");
const isResponseData = (obj) => {
    if (typeof obj === "object") {
        const requirements = [
            "headers" in obj ? typeof obj["headers"] === "object" : true,
            "data" in obj ? typeof obj["data"] === "object" : true,
            typeof obj["status"] === "number"
        ];
        return !requirements.includes(false);
    }
    else {
        return false;
    }
};
exports.isResponseData = isResponseData;
const isResponse = (obj) => {
    if (exports.isResponseData(obj)) {
        const requirements = [
            "request" in obj && request_1.isRequest(obj["request"])
        ];
        return !requirements.includes(false);
    }
    else {
        return false;
    }
};
exports.isResponse = isResponse;
