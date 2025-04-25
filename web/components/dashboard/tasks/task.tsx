"use client"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FaCalendarAlt } from "react-icons/fa"
import { FaRegCircle } from "react-icons/fa6"
import { FaCheckCircle } from "react-icons/fa"
import { useActionState, useOptimistic, useState } from "react"
import { TaskType } from "../../../types/taskType"
import moment from "moment"
import { deleteTask, toggleTask } from "../../../data-access/tasks"
import DeleteButton from "../delete-button"
import UpdateTaskDialog from "./update-task-dialog"
import { CategoryType } from "../../../types/formStateType"

type Props = {
  task: TaskType
  categories: CategoryType[] | null
}

const Task = ({ task, categories }: Props) => {
  const {
    id,
    title,
    dueDate,
    done,

    category,
  } = task

  const formattedDate = moment(dueDate).format("MMMM D, YYYY")

  const [optimisticDone, setOptimisticDone] = useOptimistic(
    done,
    (prevDone) => !prevDone
  )

  const handleTaskStatus = async (id: string) => {
    setOptimisticDone(!optimisticDone)
    await toggleTask(id)
  }

  return (
    <div className="task-container">
      <div className="data-container">
        <form
          className="input-container"
          action={async () => {
            await handleTaskStatus(id)
          }}
        >
          <input type="hidden" value={id} name="taskId" />

          <button type="submit" className="check">
            {optimisticDone ? (
              <FaCheckCircle size={24} />
            ) : (
              <FaRegCircle size={24} />
            )}
          </button>
        </form>
        <div className="data-text-contianer">
          <h3
            className="task-title"
            style={{
              textDecoration: optimisticDone ? "line-through" : "none",
            }}
          >
            {title}
          </h3>
          {category && (
            <div className="task-category">
              {" "}
              <p>{category.name}</p>
            </div>
          )}
        </div>
      </div>
      <div className="side-date-container">
        <div className="date-container">
          <FaCalendarAlt size={12} />
          {dueDate && <p>{formattedDate}</p>}
        </div>

        <DeleteButton formAction={deleteTask} itemId={id} />
        <UpdateTaskDialog task={task} categories={categories} />
      </div>
    </div>
  )
}

export default Task
