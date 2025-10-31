export enum MetadataKeys {
    // CONTROLLER
    BASE_PATH = 'express:base_path',
    // ROUTE VERB
    ROUTERS = 'express:routers',
    //  USE HANDLER
    EXPRESS_USE_HANDLERS = 'express:handlers',
    // EXPRESS MIDDLEWARE
    MIDDLEWARE = 'express:middleware',
    // AUTHORIZATION
    AUTHORIZATION = 'server:authorization',
    AUTHORIZATION_OR_MODE = 'server:authorization:or_mode',
    AUTHORIZATION_VALIDATORS = 'server:authorization:validators',
    AUTHENTICATION_HANDLERS = 'auth:authentication',
}
