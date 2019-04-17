import { PayloadAction } from 'typesafe-actions/dist/type-helpers';
import { UserSession, UserSessionState } from './types';
import { call, put, select } from 'redux-saga/effects';

import api from '../../services/api';
import { loginFail, updateSession } from './actions';

export function* login(action: PayloadAction<any, any>) {
    try {
        const errorRate = action.payload.errorRate;
        const response = yield call(api.post, 'session', errorRate && {errorRate} )
        yield put(updateSession(response.data));
    } catch (error) {
        yield put(loginFail());
    }
}

export function* logout() {
    try {
        const state = yield select();
        const userSessionState = state.userSessionState as UserSessionState;
        const response = yield call(api.delete, 'session', {
            headers: {
                sessionId: userSessionState.data.sessionId
            }
        })
        yield put(updateSession(null));
    } catch (error) {
        yield put(loginFail());
    }
}

export function* patchErrorRate(action: PayloadAction<any, any>) {
    try {
        const state = yield select();
        const userSessionState = state.userSessionState as UserSessionState;
        const response = yield call(api.patch, 'session', {
            errorRate: action.payload.errorRate
        }, {
                headers: {
                    sessionId: userSessionState.data.sessionId
                }
            })
        yield put(updateSession(Object.assign({}, userSessionState.data, response.data)));
    } catch (error) {
        yield put(loginFail());
    }
}