import { AddTodo, FilterTodos, TodosList } from "./index"

export const Todos = (): JSX.Element => {
  return (
    <div className="w-[30rem] my-[4rem] mx-auto px-[2rem] py-[2rem] border border-solid border-red-950">
      <FilterTodos />
      <TodosList />
      <AddTodo />
    </div>
  )
}