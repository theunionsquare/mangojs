import { injectable } from 'inversify'
import { IDatabaseManagerFactory } from './types'

/**
 * Dummy database manager factory for testing purposes.
 *
 * @deprecated This class will be removed in a future version.
 * Use PostgresDBManagerFactory or CockRoachDBManagerFactory instead.
 */
@injectable()
export class DummyDBManagerFactory implements IDatabaseManagerFactory {
    private connection: string;

    constructor(
        connection: string,
    ) {
        this.connection = connection
    }

    dbConnection(): void {}

    async getConnection(): Promise<{}> {
        return {}
    }

    async getStatus() {
        return true
    }
}
