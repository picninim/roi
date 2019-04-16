import { action } from 'typesafe-actions';
import { UserSessionTypes, UserSession } from './types';

export const loginRequest = () => action(UserSessionTypes.LOGIN_REQUEST);
export const updateErrorRate = (data: UserSession) => action(UserSessionTypes.UPDATE_ERROR_RATE_REQUEST, { data });
export const loginSuccess = (data: UserSession) => action(UserSessionTypes.LOGIN_SUCCESS, { data });
export const loginFail = () => action(UserSessionTypes.LOGIN_FAIL);