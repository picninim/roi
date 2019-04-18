import { TodosState, TodosTypes } from './types';
import { Reducer } from 'redux';

const INITAL_STATE: TodosState = {
    data: [],
    loading: false,
    error: null,
    errorDetails: null
}

const reducer: Reducer<TodosState> = (state = INITAL_STATE, action) => {
    switch (action.type) {

        case TodosTypes.GET_ALL_REQ:
            return { ...state, data: [], loading: true, error: null, errorDetails: null }

        case TodosTypes.CREATE_TODO_REQ:
            return { ...state, loading: true, error: null, errorDetails: null }

        case TodosTypes.ALTER_TODO_REQ:
            return { ...state, loading: true, error: null, errorDetails: null }

        case TodosTypes.DELETE_TODO_REQ:
            return { ...state, loading: true, error: null, errorDetails: null }

        case TodosTypes.REQ_FAIL:
            return { ...state, data: state.data, error: action.payload.error, errorDetails: action.payload.details }

        case TodosTypes.UPDATE_TODOS:
            return { ...state, data: action.payload.todos }

        case TodosTypes.ADD_TODO:
            state.data.push(action.payload.todo);
            return { ...state, data: state.data }

        case TodosTypes.DELETE_TODO:
            return { ...state, data: action.payload.todos }

        default:
            return state
    }
}

export default reducer;