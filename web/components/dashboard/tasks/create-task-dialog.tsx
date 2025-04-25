"use client"
import * as Dialog from "@radix-ui/react-dialog"
import { IoCloseCircleOutline } from "react-icons/io5"
import { useActionState } from "react"
import { createTask } from "../../../data-access/tasks"
import CategorySelector from "../categories/category-selector"
import { CategoryType } from "../../../types/formStateType"

type Props = {
  categories: CategoryType[]
}

const CreateTaskDialog = ({ categories }: Props) => {
  const [state, action, isPending] = useActionState(createTask, undefined)
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="btn-primary">Create New Task</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="DialogTitle">Add New Task</Dialog.Title>
          <Dialog.Description className="DialogDescription"></Dialog.Description>
          <form className="task-form" action={action}>
            <label className="" htmlFor="title">
              Title
            </label>
            <input required name="title" id="title" placeholder="Task Title" />
            <div>
              <label htmlFor="category">Category</label>
              <CategorySelector categories={categories} />
            </div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Task Description"
              rows={5}
            />

            <label htmlFor="dueDate">Due Date</label>
            <input type="date" name="dueDate" id="dueDate" />
            <button disabled={isPending} type="submit" className="btn-primary">
              {isPending ? "Loading..." : "Add Task"}
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

export default CreateTaskDialog
