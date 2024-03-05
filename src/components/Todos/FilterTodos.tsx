import { useDispatch } from "react-redux"
import { todosSliceActions } from "../../store"

export const FilterTodos = (): JSX.Element => {
  const dispatch = useDispatch()

  const filterTodo = (by: string) => {
    dispatch(todosSliceActions.filterTodos({ by }))
  }

  const sortTypes = [
    {
      label: "All",
      value: "all"
    },
    {
      label: "Completed",
      value: "completed"
    },
    {
      label: "Uncompleted",
      value: "uncompleted"
    }
  ]

  return (
    <div className="mb-[0.6rem]">
      <div className="flex items-center">
        <span className="mr-[0.6rem]">Filter by:</span>
        <select
          className="py-[0.2rem]"
          onChange={(e) => filterTodo(e.target.value)}
        >
          {
            sortTypes.map((option, index) => <option key={index} value={option.value}>
              {option.label}
            </option>)
          }
        </select>
      </div>
    </div>
  )
}