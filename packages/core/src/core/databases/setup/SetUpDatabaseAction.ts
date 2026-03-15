import { SetUpDatabaseRecord } from '../../types/database/SetUpDataBaseRecord'

/**
 * Base class for database setup actions.
 *
 * @deprecated This class will be removed in a future version.
 */
export class SetUpDatabaseAction {
    onFileContent(
        file: SetUpDatabaseRecord,
        content: string,
        dropBeforeInsert: boolean
    ) {}
    onError(err: Error) {}
}
