import { useSelector } from "react-redux"
import { TodosListElement } from "./index"

import { RootState } from "../../store"

export const TodosList = () => {
  const { todos } = useSelector((state: RootState) => state.todos)
  return (
    <>
      {
        todos.map((todo, index) => <TodosListElement key={index} {...todo} />)
      }
    </>
  )
}