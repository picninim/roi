import { UserSessionState, UserSessionTypes } from './types';
import { Reducer } from 'redux';

const INITAL_STATE: UserSessionState = {
    data: null,
    loading: false,
    error: false
}

const reducer: Reducer<UserSessionState> = (state = INITAL_STATE, action) => {
    console.log(state);
    switch (action.type) {

        case UserSessionTypes.LOGIN_REQUEST:
            return { ...state, loading: true }

        case UserSessionTypes.UPDATE_ERROR_RATE_REQUEST:
            return { ...state, loading: true, error: false }

        case UserSessionTypes.LOGIN_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data }

        case UserSessionTypes.LOGIN_FAIL:
            return { ...state, loading: false, error: true, data: null }

        default:
            return state
    }
}

export default reducer;