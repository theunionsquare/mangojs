import { MetadataKeys } from '../../utils/metadata.keys'

/**
 * Define the base API address
 * @param basePath string
 * @returns
 */
export const Controller = (basePath: string): ClassDecorator => {
    return (target) => {
        Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target)
    }
}
