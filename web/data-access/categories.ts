"use server"
import { verifySession } from "../lib/sessions"
import { BackendUrl } from "../lib/contants"
import {
  CategoryType,
  CreateCategorySchema,
  FormState,
  UpdateCategorySchema,
} from "../types/formStateType"
import { revalidatePath } from "next/cache"

// export type CategoryResult =
//   | {
//       success: boolean
//       message: string
//     }
//   | undefined

export type responseError = {
  message: string
  error: string
  statusCode: number
}

/* Get User Categories */
export const getCategories = async () => {
  const session = await verifySession()
  if (!session) return null
  try {
    const response = await fetch(`${BackendUrl}/categories`, {
      method: "GET",
      //Include the accessToken in the request
      headers: {
        authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (!response.ok) {
      console.error(
        `Failed to fetch tasks: ${response.status} ${response.statusText}`
      )
      return null
    }

    return (await response.json()) as CategoryType[]
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching categories:", error.message)
    }
    return null
  }
}

/* Create New Category */
export const createNewCategory = async (
  previousState: FormState,
  formData: FormData
): Promise<FormState> => {
  const session = await verifySession()
  if (!session) {
    return {
      success: false,
      message: "Unauthorized access attempt.",
    }
  }

  const formDataObject = Object.fromEntries(formData.entries())
  const validationResult = CreateCategorySchema.safeParse(formDataObject)

  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.error.errors[0]?.message || "Invalid data",
    }
  }

  const payload = {
    name: validationResult.data.name,
    userId: session.user.id,
  }

  try {
    const response = await fetch(`${BackendUrl}/categories`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = (await response.json()) as responseError
      console.error("Error creating category:", errorData)
      return {
        success: false,
        message: errorData.message || "Failed to create category",
      }
    }

    revalidatePath("/dashboard")
    return {
      success: true,
      message: "Category created successfully",
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating category:", error.message)
    }
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}

/* Update Category */
export const updateCategory = async (
  previousState: FormState,
  formData: FormData
): Promise<FormState> => {
  const session = await verifySession()
  if (!session)
    return {
      success: false,
      message: "Unauthorized access attempt.",
    }

  const formDataObject = Object.fromEntries(formData.entries())
  const validationResult = UpdateCategorySchema.safeParse(formDataObject)

  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.error.errors[0]?.message || "Invalid data",
    }
  }

  const payload = {
    name: validationResult.data.name,
    id: validationResult.data.id,
    userId: session.user.id,
  }

  try {
    const response = await fetch(`${BackendUrl}/categories/${payload.id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = (await response.json()) as responseError
      console.error("Error updating category:", errorData)
      return {
        success: false,
        message: errorData.message || "Failed to update category",
      }
    }
    revalidatePath("/dashboard")
    return {
      success: true,
      message: "Category updated successfully",
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating category:", error.message)
    }
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}

/* Delete Category */
export const deleteCategory = async (
  previousState: FormState,
  formData: FormData
): Promise<FormState> => {
  const session = await verifySession()
  if (!session)
    return { success: false, message: "Unauthorized access attempt." }
  const id = formData.get("id")
  if (!id) {
    return { success: false, message: "Invalid data" }
  }

  try {
    const response = await fetch(`${BackendUrl}/categories/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${session.accessToken}`,
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      console.error("Error deleting category:", errorData)
      return {
        success: false,
        message: errorData.message || "Failed to delete category",
      }
    }

    revalidatePath("/dashboard")
    return {
      success: true,
      message: "Category deleted successfully",
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting category:", error.message)
    }
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}
