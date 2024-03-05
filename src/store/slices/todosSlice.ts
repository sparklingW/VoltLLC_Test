import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

import { changeTodoStatus, filterTodos } from "../helpers";
import { todosMock } from "../../todosMock";
import { Todo } from "../../components/types";

export interface TodosSlice {
    todos: Array<Todo>;
    originalTodos: Array<Todo>;
}

export type FilterParams = {
    by: string;
};

type AddTodoPayload = PayloadAction<Todo, string>;
type DeleteTodoPayload = PayloadAction<Pick<Todo, "id">, string>;
type CompleteTodoPayload = PayloadAction<Pick<Todo, "id">, string>;
type SortTodoPayload = PayloadAction<FilterParams, string>;

const initialState: TodosSlice = {
    todos: todosMock,
    originalTodos: todosMock
};

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo(state, action: AddTodoPayload) {
            return {
                ...state,
                todos: [
                    ...state.todos,
                    action.payload
                ],
                originalTodos: [
                    ...state.originalTodos,
                    action.payload
                ]
            }
        },
        deleteTodo(state, action: DeleteTodoPayload) {
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload.id),
                originalTodos: state.originalTodos.filter((todo) => todo.id !== action.payload.id)
            }
        },
        completeTodo(state, action: CompleteTodoPayload) {
            return {
                ...state,
                todos: changeTodoStatus({ todos: current(state.todos), id: action.payload.id }),
                originalTodos: changeTodoStatus({ todos: current(state.originalTodos), id: action.payload.id })
            }
        },
        filterTodos(state, action: SortTodoPayload) {
            return {
                ...state,
                todos: filterTodos({ originalTodos: [...current(state.originalTodos)], sort: action.payload })
            }
        }
    }
});

export const todosSliceActions = todosSlice.actions;

export const todosSliceReducer = todosSlice.reducer;