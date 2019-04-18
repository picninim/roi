import { action } from 'typesafe-actions';
import { TodosTypes, Todo, ErrorTypes } from './types';

export const getAllRequest = () => action(TodosTypes.GET_ALL_REQ);
export const createTodoRequest = (todo: Todo) => action(TodosTypes.CREATE_TODO_REQ, { todo });
export const alterTodoRequest = (todo: Todo) => action(TodosTypes.ALTER_TODO_REQ, { todo });
export const deleteTodoRequest = (todo: Todo) => action(TodosTypes.DELETE_TODO_REQ, { todo });
export const updateTodos = (todos: Todo[]) => action(TodosTypes.UPDATE_TODOS, { todos });
export const addTodo = (todo: Todo) => action(TodosTypes.ADD_TODO, { todo });
export const requestFail = (error: ErrorTypes, details?: any) => action(TodosTypes.REQ_FAIL, { error, details });
// export const removeTodo = (todo: Todo) => action(TodosTypes.ADD_TODO, { todo });