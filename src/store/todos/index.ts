import { TodosState, TodosTypes } from './types';
import { Reducer } from 'redux';

const INITAL_STATE: TodosState = {
    data: [],
    loading: false,
    error: null,
    errorDetails: null,
    loadingTodo: null
}

const reducer: Reducer<TodosState> = (state = INITAL_STATE, action) => {
    switch (action.type) {

        case TodosTypes.GET_ALL_REQ:
            return { ...state, data: [], loading: true, error: null, errorDetails: null }

        case TodosTypes.CREATE_TODO_REQ:
            return { ...state, loading: true, error: null, errorDetails: null }

        case TodosTypes.ALTER_TODO_REQ:
            return { ...state, loading: true, error: null, errorDetails: null, loadingTodo: action.payload.todo.id }

        case TodosTypes.DELETE_TODO_REQ:
            return { ...state, loading: true, error: null, errorDetails: null }

        case TodosTypes.REQ_FAIL:
            return { ...state, data: state.data, error: action.payload.error, errorDetails: action.payload.details, loading: false }

        case TodosTypes.UPDATE_TODOS:
            return { ...state, data: action.payload.todos, loading: false }

        case TodosTypes.UPDATE_TODO:
            const todos = state.data;
            const index = todos.findIndex((todo) => action.payload.todo.id === todo.id);
            todos[index] = action.payload.todo;
            debugger;
            return { ...state, data: todos, loadingTodo: null, loading: false }

        case TodosTypes.ADD_TODO:
            state.data.push(action.payload.todo);
            return { ...state, data: state.data, loading: false }

        case TodosTypes.DELETE_TODO:
            return { ...state, data: action.payload.todos, loading: false }

        default:
            return state
    }
}

export default reducer;