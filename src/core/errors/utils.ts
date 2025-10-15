export function isError(obj: unknown) {
    return Object.prototype.toString.call(obj) === '[object Error]'
}
