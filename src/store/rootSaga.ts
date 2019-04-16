import { all, takeLatest } from "redux-saga/effects";

import { UserSessionTypes } from "./userSession/types";
import { login, patchErrorRate } from "./userSession/saga";

export default function* rootSaga() {
    return yield all([
        takeLatest(UserSessionTypes.LOGIN_REQUEST as any, login),
        takeLatest(UserSessionTypes.UPDATE_ERROR_RATE_REQUEST as any, patchErrorRate)
    ])
}