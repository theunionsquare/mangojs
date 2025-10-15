import { IDatabaseManagerFactory } from '../databasemanager/IDatabaseManagerFactory'

export class IApplicationPreCheck {
    constructor(entityManager: IDatabaseManagerFactory) {}
    startCheck(): void {}
}
