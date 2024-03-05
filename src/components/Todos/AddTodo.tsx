import React, { useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from "react-redux"

import { todosSliceActions } from "../../store"
import { Todo } from "../types"

export const AddTodo = (): JSX.Element => {
  const [title, setTitle] = useState<string>("")
  const dispatch = useDispatch()

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const addTodo = (todo: Todo) => {
    dispatch(todosSliceActions.addTodo(todo))
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