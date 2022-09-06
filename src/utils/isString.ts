export function isString(input: unknown) {
    if (typeof input === "string" || input instanceof String) return input;
    else return "";
}
