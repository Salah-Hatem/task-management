"use client"
import * as Dialog from "@radix-ui/react-dialog"
import { IoCloseCircleOutline } from "react-icons/io5"
import { useActionState } from "react"
import { FaPlus } from "react-icons/fa"
import { createNewCategory } from "../../../data-access/categories"

const CreateCategoryDialog = () => {
  const [state, action, pending] = useActionState(createNewCategory, undefined)
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <FaPlus className="sidebar-icon" aria-label="Add Category" size={24} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="DialogTitle">Add New Category</Dialog.Title>
          <Dialog.Description className=""></Dialog.Description>
          {/* <CreateTaskForm /> */}
          <form className="create-category-form" action={action}>
            <label htmlFor="name">Category Name</label>
            <input required name="name" id="name" placeholder="Category Name" />

            <button disabled={pending} type="submit" className="btn-primary">
              {pending ? "Loading..." : "Add Category"}
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

export default CreateCategoryDialog
