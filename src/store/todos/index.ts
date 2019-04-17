import { TodosState, TodosTypes } from './types';
import { Reducer } from 'redux';

const INITAL_STATE: TodosState = {
    data: [],
    loading: false,
    error: false
}

const reducer: Reducer<TodosState> = (state = INITAL_STATE, action) => {
    switch (action.type) {

        case TodosTypes.GET_ALL_REQ:
            return { ...state, loading: true }

        case TodosTypes.CREATE_TODO_REQ:
            return { ...state, loading: true }

        case TodosTypes.ALTER_TODO_REQ:
            return { ...state, loading: true }

        case TodosTypes.DELETE_TODO_REQ:
            return { ...state, loading: true }

        case TodosTypes.REQ_FAIL:
            return { ...state, data: state.data }

        case TodosTypes.ADD_TODO:
            return { ...state, data: state.data.push(action.payload.todo) }

        case TodosTypes.REMOVE_TODO:
            return { ...state, data: action.payload.todos }

        default:
            return state
    }
}

export default reducer;