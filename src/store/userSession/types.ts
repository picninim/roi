export enum UserSessionTypes {
    LOGIN_REQUEST = '@userSession/LOGIN_REQUEST',
    UPDATE_ERROR_RATE_REQUEST = '@userSession/UPDATE_ERROR_RATE_REQUEST',
    LOGIN_SUCCESS = '@userSession/LOGIN_SUCCESS',
    LOGIN_FAIL = '@userSession/LOGIN_FAIL'
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