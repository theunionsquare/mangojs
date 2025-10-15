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
