import { action } from 'typesafe-actions';
import { UserSessionTypes, UserSession } from './types';

export const loginRequest = (errorRate?: number) => action(UserSessionTypes.LOGIN_REQUEST, { errorRate });
export const updateErrorRate = (errorRate: number) => action(UserSessionTypes.UPDATE_ERROR_RATE_REQUEST, { errorRate });
// export const loginSuccess = (data: UserSession) => action(UserSessionTypes.LOGIN_SUCCESS, { data });
export const logoutRequest = () => action(UserSessionTypes.LOGOUT_REQUEST);
export const updateSession = (data: UserSession) => action(UserSessionTypes.UPDATE_USERSESSION, { data });
export const loginFail = () => action(UserSessionTypes.LOGIN_FAIL);