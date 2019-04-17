export enum UserSessionTypes {
    LOGIN_REQUEST = '@userSession/LOGIN_REQUEST',
    UPDATE_ERROR_RATE_REQUEST = '@userSession/UPDATE_ERROR_RATE_REQUEST',
    UPDATE_USERSESSION = '@userSession/UPDATE_USERSESSION',
    LOGIN_FAIL = '@userSession/LOGIN_FAIL',
    LOGOUT_REQUEST = '@userSession/LOGOUT_REQUEST'
}

export interface UserSession {
    status: string,
    sessionId: string,
    errorRate: number,
    name: string
}

export interface UserSessionState {
    readonly data: UserSession,
    readonly loading: boolean,
    readonly error: boolean
}