import { Context } from './Context.generics'

export interface IPersistenceContext {
    // transaction(process: Function): string;
    inTransaction(process: Context<any>): {}
}
