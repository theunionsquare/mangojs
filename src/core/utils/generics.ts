import { v4 as uuidv4 } from 'uuid'

export const generateUUID = () => {
    return uuidv4()
}

/**
 * GenerateRandom String
 * @param length
 * @returns
 */
export function generateRandomString(length: number = 10): string {
    let result = ''
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
        counter += 1
    }
    return result
}

/**
 * generate random password
 */
export function generateRandomPassword(length: number = 12): string {
    const password = generateRandomString(length)

    // Optionally, validate the password
    //try{
    //    password_validation.validate_password(password)
    //}
    //catch(err){
    //    throw new Error('password not valid')
    //}
    return password
}

/**
 * Generate Magic Link
 * @param size
 * @returns
 */
export function generateMagicLink(size: number = 95): string {
    return generateRandomString(size)
}
