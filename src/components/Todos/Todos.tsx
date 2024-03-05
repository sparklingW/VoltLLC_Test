import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import classNames from "classnames"
import { v4 as uuidv4 } from 'uuid'

import { RootState, todosSliceActions } from "../../store"
import { Todo } from "../types"

interface TodosListElementProps extends Todo {
  changeTodoStatus: (id: string) => void
  deleteTodo: (id: string) => void
}

const TodosListElement = ({ title, id, completed, changeTodoStatus, deleteTodo }: TodosListElementProps): JSX.Element => {
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

interface AddTodoProps {
  addTodo: (todo: Todo) => void
}

const AddTodo = ({ addTodo }: AddTodoProps): JSX.Element => {
  const [title, setTitle] = useState<string>("")

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const newTodo: Todo = {
    title,
    id: uuidv4(),
    completed: false,
  }

  return (
    <div className="flex items-center justify-between mt-[0.8rem]">
      <div>
        <label htmlFor="todo_title">Title:</label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          id="todo_title"
          onChange={onChangeTitle}
          className="mx-[0.5rem] px-[0.2rem] border border-solid border-black"
        />
      </div>
      <button
        onClick={() => {
          addTodo(newTodo)
          setTitle("")
        }}
        className="px-[0.2rem] border border-dashed border-black"
      >
        Add Todo
      </button>
    </div>
  )
}

interface SortTodosProps {
  filterTodo: (by: string) => void
}

const FilterTodos = ({ filterTodo }: SortTodosProps): JSX.Element => {
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

export const Todos = (): JSX.Element => {
  const { todos } = useSelector((state: RootState) => state.todos)
  const dispatch = useDispatch()

  const changeTodoStatus = (todoId: string) => {
    dispatch(todosSliceActions.completeTodo({ id: todoId }))
  }

  const addTodo = (todo: Todo) => {
    dispatch(todosSliceActions.addTodo(todo))
  }

  const filterTodo = (by: string) => {
    dispatch(todosSliceActions.filterTodos({ by }))
  }

  const deleteTodo = (id: string) => {
    dispatch(todosSliceActions.deleteTodo({ id }))
  }

  return (
    <div className="w-[30rem] my-[4rem] mx-auto px-[2rem] py-[2rem] border border-solid border-red-950">
      <FilterTodos filterTodo={filterTodo} />
      {
        todos.map((todo, index) => <TodosListElement
          key={index}
          changeTodoStatus={changeTodoStatus}
          deleteTodo={deleteTodo}
          {...todo}
        />)
      }
      <AddTodo addTodo={addTodo} />
    </div>
  )
}