import { injectable } from 'inversify'
import { IDatabaseManagerFactory } from './IDatabaseManagerFactory'


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
