/**
 * Checks if an object is an Error instance.
 *
 * @deprecated Use native `instanceof Error` check instead.
 */
export function isError(obj: unknown) {
    return Object.prototype.toString.call(obj) === '[object Error]'
}
