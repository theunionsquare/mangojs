export interface AuthUserBase {
    uid: string
    firstName: string
    lastName: string
    email: string
}

export interface AuthUser extends AuthUserBase {
    userType: AuthUserType
}

export enum AuthUserType {
    ADMIN = 'admin',
    PARTNER = 'partner',
    USER = 'user',
}
