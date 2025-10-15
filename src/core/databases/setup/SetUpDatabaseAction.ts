import { SetUpDatabaseRecord } from '../../types/database/SetUpDataBaseRecord'

export class SetUpDatabaseAction {
    onFileContent(
        file: SetUpDatabaseRecord,
        content: string,
        dropBeforeInsert: boolean
    ) {}
    onError(err: Error) {}
}
