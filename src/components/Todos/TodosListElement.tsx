import { Todo } from "../types"
import classNames from "classnames"
import { useDispatch } from "react-redux"

import { todosSliceActions } from "../../store"

export const TodosListElement = ({ title, id, completed }: Todo): JSX.Element => {
  const dispatch = useDispatch()

  const changeTodoStatus = (todoId: string) => {
    dispatch(todosSliceActions.completeTodo({ id: todoId }))
  }

  const deleteTodo = (id: string) => {
    dispatch(todosSliceActions.deleteTodo({ id }))
  }
  
  return (
    <div className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        name="completed"
        checked={completed}
        onChange={() => changeTodoStatus(id)}
        className="mr-[0.5rem]"
      />
      <h2 className={classNames("capitalize",
        {
          "line-through": completed
        }
      )}
      onClick={() => changeTodoStatus(id)}
      >
        {title}
      </h2>
      <div className="ml-[0.6rem] font-bold" role="button" onClick={() => deleteTodo(id)}>X</div>
    </div>
  )
}