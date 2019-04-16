import { UserSession, UserSessionState } from './types';
import { call, put, select } from 'redux-saga/effects';

import api from '../../services/api';
import { loginFail, loginSuccess, updateErrorRate } from './actions';

export interface LoginBody {
    errorRate?: number
}

function storeToken(token) {
    localStorage.setItem('token', token);
}

export function* login(data?: LoginBody) {
    try {
        const response = yield call(api.post, 'session', {
        })
        yield call(storeToken, (response.data as UserSession).sessionId);
        yield put(loginSuccess(response.data));
    } catch (error) {
        yield put(loginFail());
    }
}

export function* patchErrorRate(data: LoginBody) {
    try {
        // const token = localStorage.getItem('token');
        const state = yield select();
        const userSessionState = state.userSessionState as UserSessionState

        console.log(userSessionState.data.sessionId);

        const response = yield call(api.patch, 'session', {
            errorRate: userSessionState.data.errorRate + 1
        }, {
                headers: {
                    sessionId: userSessionState.data.sessionId
                }
            })
        yield put(loginSuccess(Object.assign({}, userSessionState.data, response.data)));
    } catch (error) {
        console.log(error);
        yield put(loginFail());
    }
}