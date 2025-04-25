"use client"
import * as Dialog from "@radix-ui/react-dialog"
import { IoCloseCircleOutline } from "react-icons/io5"
import { useActionState, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { updateCategory } from "../../../data-access/categories"
type Props = {
  categoryId: string
  categoryName: string
}

const UpdateCategoryDialog = ({ categoryId, categoryName }: Props) => {
  const [state, action, pending] = useActionState(updateCategory, undefined)
  const [categoryNameState, setCategoryName] = useState(categoryName)

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <FaEdit className="sidebar-icon" aria-label="Edit Category" size={18} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="DialogTitle">Edit</Dialog.Title>
          <Dialog.Description className=""></Dialog.Description>

          <form className="create-category-form" action={action}>
            <label className="" htmlFor="name">
              Category Name
            </label>
            <input
              required
              className=""
              name="name"
              id="name"
              placeholder="Category Name"
              value={categoryNameState}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <input type="hidden" name="id" value={categoryId} />

            <button disabled={pending} type="submit" className="btn-primary">
              {pending ? "Loading..." : "Update Category"}
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

export default UpdateCategoryDialog
