/**
 * Method decorator that logs method calls with timestamps.
 *
 * @deprecated Use the Loggers module for proper logging instead.
 * This decorator uses console.log which is not suitable for production.
 */
export function loggedMethod(): any {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const targetMethod = descriptor.value
        descriptor.value = function (...args: any[]) {
            console.log(`CALLED ${propertyKey} on ${new Date().toISOString()}`)
            return targetMethod.apply(this, args)
        }
        return descriptor
    }
}
