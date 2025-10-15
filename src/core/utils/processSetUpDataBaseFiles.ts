import * as fs from 'fs'
import { SetUpDatabaseRecord } from '../types/database/SetUpDataBaseRecord'
import { SetUpDatabaseAction } from '../databases/setup/SetUpDatabaseAction'

export function processSetUpDataBaseService(
    fileList: Array<SetUpDatabaseRecord>,
    setUpDatabaseAction: SetUpDatabaseAction
) {
    fileList.forEach(function (file) {
        fs.readFile(file.file, 'utf-8', async function (err, content) {
            if (err) {
                setUpDatabaseAction.onError(err)
                return
            }
            await setUpDatabaseAction.onFileContent(file, content, true)
        })
    })
}
