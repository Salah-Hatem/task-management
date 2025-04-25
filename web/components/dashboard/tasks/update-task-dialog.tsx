"use client"
import * as Dialog from "@radix-ui/react-dialog"
import { IoCloseCircleOutline } from "react-icons/io5"
import { useActionState } from "react"
import { updateTask } from "../../../data-access/tasks"
import CategorySelector from "../categories/category-selector"
import { CategoryType } from "../../../types/formStateType"
import { TaskType } from "../../../types/taskType"
import moment from "moment"
import { FaEdit } from "react-icons/fa"

type Props = {
  task: TaskType
  categories: CategoryType[] | null
}

const UpdateTaskDialog = ({ task, categories }: Props) => {
  const { id, title, description, dueDate, categoryId } = task
  const formattedDate = moment(dueDate).format("YYYY-MM-DD")

  const [state, action, isPending] = useActionState(updateTask, undefined)
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <FaEdit
          className="task-edit-icon"
          aria-label="Edit Category"
          size={24}
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="DialogTitle">Update Task</Dialog.Title>
          <Dialog.Description className="DialogDescription"></Dialog.Description>
          <form className="task-form" action={action}>
            <label htmlFor="title">Title</label>
            <input type="hidden" name="taskId" value={id} />
            <input
              required
              name="title"
              id="title"
              placeholder="Task Title"
              defaultValue={title}
            />
            <div>
              <label htmlFor="categoryId">Category</label>
              <CategorySelector
                selectedCategoryId={categoryId}
                categories={categories ?? []}
              />
            </div>
            <label htmlFor="description">Description</label>
            <textarea
              rows={5}
              name="description"
              id="description"
              placeholder="Task Description"
              defaultValue={description ? description : ""}
            />

            <label className="" htmlFor="dueDate">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              defaultValue={formattedDate}
            />
            <button disabled={isPending} type="submit" className="btn-primary">
              {isPending ? "Loading..." : "Update Task"}
            </button>
            {state?.success === false && (
              <span className="error-message">{state.message}</span>
            )}
            {state?.success === true && (
              <span className="error-message" style={{ color: "green" }}>
                {state.message}
              </span>
            )}
          </form>

          <Dialog.Close asChild>
            <IoCloseCircleOutline
              className="icon-button"
              aria-label="Close"
              size={24}
            />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default UpdateTaskDialog
