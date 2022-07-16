export type RequestMethod =
    "get" | "GET" |
    "post" | "POST" |
    "put" | "PUT" |
    "patch" | "PATCH" |
    "head" | "HEAD" |
    "options" | "OPTIONS" |
    "delete" | "DELETE" |
    "purge" | "PURGE" |
    "link" | "LINK" |
    "unlink" | "UNLINK";

export const isRequestMethod = (obj: any): obj is RequestMethod => {
    if (typeof obj === "string") {
        const allMethods = new Array<RequestMethod>(
            "get", "GET",
            "post", "POST",
            "put", "PUT",
            "patch", "PATCH",
            "head", "HEAD",
            "options", "OPTIONS",
            "delete", "DELETE",
            "purge", "PURGE",
            "link", "LINK",
            "unlink", "UNLINK"
        ) as string[];
        return allMethods.includes(obj);
    } else {
        return false;
    }
}
