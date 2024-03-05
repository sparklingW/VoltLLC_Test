import { Todo } from "../../components/types"

interface ChangeTodoStatusParams {
    todos: Array<Todo>;
    id: string;
};

export const changeTodoStatus = ({ todos, id }: ChangeTodoStatusParams): Array<Todo> => {
    const index = todos.findIndex(todo => todo.id === id);
    const todosCopy = [...todos];

    todosCopy[index] = {
        ...todosCopy[index],
        completed: !todosCopy[index].completed
    };

    return todosCopy;
}

type SortParams = {
    by: string;
};

interface FilterTodosParams {
    originalTodos: Array<Todo>;
    sort: SortParams;
}

export const filterTodos = ({ originalTodos, sort }: FilterTodosParams): Array<Todo> => {
    switch (sort.by) {
        case "all":
            return originalTodos;
        case "completed":
            return originalTodos.filter((todo => todo.completed));
        case "uncompleted":
            return originalTodos.filter((todo => !todo.completed));
        default:
            return originalTodos;
    }
}