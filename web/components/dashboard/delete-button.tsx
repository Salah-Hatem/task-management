"use client"
import { useActionState } from "react"
import { FaWindowClose } from "react-icons/fa"
import { CategoryResult } from "../../data-access/categories"

type Props = {
  itemId: string
  formAction: (
    previousState: CategoryResult,
    formData: FormData
  ) => Promise<CategoryResult>
}

const DeleteButton = ({ itemId, formAction }: Props) => {
  const [state, action, isPending] = useActionState(formAction, undefined)

  return (
    <form action={action}>
      <input type="hidden" name="id" value={itemId} />
      <button className=" delete-btn " type="submit" disabled={isPending}>
        {isPending ? "..." : <FaWindowClose className="close-icon" />}
      </button>
    </form>
  )
}
export default DeleteButton
