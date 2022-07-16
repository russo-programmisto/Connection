export declare type RequestMethod = "get" | "GET" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "head" | "HEAD" | "options" | "OPTIONS" | "delete" | "DELETE" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK";
export declare const isRequestMethod: (obj: any) => obj is RequestMethod;
