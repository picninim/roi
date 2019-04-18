import { all, takeLatest } from "redux-saga/effects";

import { UserSessionTypes } from "./userSession/types";
import { login, patchErrorRate, logout } from "./userSession/saga";
import { TodosTypes } from "./todos/types";
import { getAll, createTodo, deleteTodo } from "./todos/saga";

export default function* rootSaga() {
    return yield all([
        takeLatest(UserSessionTypes.LOGIN_REQUEST, login),
        takeLatest(UserSessionTypes.UPDATE_ERROR_RATE_REQUEST, patchErrorRate),
        takeLatest(UserSessionTypes.LOGOUT_REQUEST, logout),

        takeLatest(TodosTypes.GET_ALL_REQ, getAll),
        takeLatest(TodosTypes.CREATE_TODO_REQ, createTodo),
        takeLatest(TodosTypes.DELETE_TODO_REQ, deleteTodo),
    ])
}