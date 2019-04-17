import { PayloadAction } from 'typesafe-actions/dist/type-helpers';
import { UserSessionState } from './../userSession/types';
import { call, put, select } from 'redux-saga/effects';

import api from '../../services/api';
import { updateTodos, requestFail, addTodo } from './actions';
import { Todo } from './types';

export function* getAll(action: PayloadAction<any, any>) {
    try {
        const state = yield select();
        const userSessionState = state.userSessionState as UserSessionState;
        const response = yield call(api.get, 'todos', {
            headers: {
                sessionId: userSessionState.data.sessionId
            }
        })
        yield put(updateTodos(Object.values(response.data.todos)));
    } catch (error) {
        console.log('asdasd')
        yield put(requestFail());
    }
}

export function* createTodo(action: PayloadAction<any, any>) {
    try {
        const state = yield select();
        const userSessionState = state.userSessionState as UserSessionState;

        const todo = action.payload.todo as Todo;

        const response = yield call(api.post, 'todos', { ...todo },
        {
            headers: {
                sessionId: userSessionState.data.sessionId
            }
        })
        yield put(addTodo(response.data.todo));
    } catch (error) {
        yield put(requestFail());
    }
}

export function* deleteTodo(action: PayloadAction<any, any>) {
    try {
        const state = yield select();
        const userSessionState = state.userSessionState as UserSessionState;

        const todo = action.payload.todo as Todo;

        const response = yield call(api.delete, `todos/${todo.id}`,
        {
            headers: {
                sessionId: userSessionState.data.sessionId
            }
        })
        yield put(updateTodos(Object.values(response.data.todos)));
    } catch (error) {
        yield put(requestFail());
    }
}