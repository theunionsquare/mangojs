import { injectable } from 'inversify'
import { IRead } from './IRead'
import { IWrite } from './IWrite'

/**
 * Abstract base repository implementing basic CRUD operations.
 *
 * @deprecated This class will be removed in a future version.
 * Use TypeORM repositories directly instead.
 */
@injectable()
export abstract class BaseRepository<T> implements IRead<T>, IWrite<T> {
    public readonly _collection: any

    constructor() {
        this._collection = {}
    }

    find(item: T): Promise<T[]> {
        throw new Error('Method not implemented.')
    }
    findOne(id: string): Promise<T> {
        throw new Error('Method not implemented.')
    }
    create(item: T): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    update(id: string, item: T): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    delete(id: string): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    count(): Promise<Number> {
        throw new Error('Method not implemented.')
    }
}
