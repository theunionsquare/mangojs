/**
 * @deprecated Use TypeORM repositories instead.
 */
export interface IWrite<T> {
    create(item: T): Promise<boolean>
    update(id: string, item: T): Promise<boolean>
    delete(id: string): Promise<boolean>
}
