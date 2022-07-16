"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRequestMethod = void 0;
const isRequestMethod = (obj) => {
    if (typeof obj === "string") {
        const allMethods = new Array("get", "GET", "post", "POST", "put", "PUT", "patch", "PATCH", "head", "HEAD", "options", "OPTIONS", "delete", "DELETE", "purge", "PURGE", "link", "LINK", "unlink", "UNLINK");
        return allMethods.includes(obj);
    }
    else {
        return false;
    }
};
exports.isRequestMethod = isRequestMethod;
