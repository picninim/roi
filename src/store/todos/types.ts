export enum TodosTypes {
    GET_ALL_REQ = '@todo/GET_ALL_REQ',
    CREATE_TODO_REQ = '@todo/CREATE_TODO_REQ',
    ALTER_TODO_REQ = '@todo/ALTER_TODO_REQ',
    DELETE_TODO_REQ = '@todo/DELETE_TODO_REQ',
    REQ_FAIL = '@todo/REQ_FAIL',

    UPDATE_TODOS = '@todo/UPDATE_TODOS',
    ADD_TODO = '@todo/ADD_TODO',
    REMOVE_TODO = '@todo/ADD_TODO',
}

export interface Todo {
    text: string;
    isCompleted: boolean,
    urgency: 1 | 2 | 3 | 4 | 5;
    id?: string;
    created?: string;
    updated?: string;
}

export interface TodosState {
    readonly data: Todo[],
    readonly loading: boolean,
    readonly error: boolean
}