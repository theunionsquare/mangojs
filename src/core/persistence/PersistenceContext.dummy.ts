import { inject, injectable } from 'inversify'
import { IPersistenceContext } from './IPersistenceContext'
import { IDatabaseManagerFactory } from '../databasemanager/IDatabaseManagerFactory'
import { Context } from './Context.generics'
import mongoose from 'mongoose'
import { INVERSITY_TYPES } from '../types/inversifyTypes'

@injectable()
class DummyPersistenceContext implements IPersistenceContext {

    public constructor(
        @inject(INVERSITY_TYPES.DatabaseManagerFactory)
        entityManager: IDatabaseManagerFactory
    ) {
    }

    /**
     * Start a transaction
     * @param context
     * @returns
     */
    async inTransaction(context: Context<mongoose.Connection>): Promise<{}> {
        console.log('Start dummy transaction')
        //TO DO: Start transaction and close it once done
        return {}
    }
}

export { DummyPersistenceContext }
