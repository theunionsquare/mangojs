/**
 * Deprecated Decorator
 *
 */

export function deprecated(
    message: string = '',
    alternative?: string | (() => void)
) {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        const originalMethod = descriptor.value
        let altMessage = `[DEPRECATED] ${message}: Use of this method is discouraged`

        if (alternative && typeof alternative === 'function') {
            altMessage += `\n\tAlternative function: ${propertyKey}`
        } else if (alternative && typeof alternative === 'string') {
            altMessage += `\n\tPreferred alternative: ${alternative}`
        }

        descriptor.value = function (...args: any[]) {
            console.warn(altMessage)
            return originalMethod.apply(this, args)
        }
        return descriptor
    }
}
