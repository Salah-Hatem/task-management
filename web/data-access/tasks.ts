"use server"
import { verifySession } from "../lib/sessions"
import { BackendUrl } from "../lib/contants"
import { PaginateOutputType } from "../types/taskType"
import {
  CreateTaskSchema,
  FormState,
  UpdateTaskSchema,
} from "../types/formStateType"
import { revalidatePath } from "next/cache"

export const getTasks = async (pageNubmer?: string | string[] | 0) => {
  //only allow logged in users to create tasks
  const session = await verifySession()
  if (!session) return null

  try {
    const response = await fetch(`${BackendUrl}/tasks?page=${pageNubmer}`, {
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
    return (await response.json()) as PaginateOutputType
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching tasks:", error.message)
    }
    return null
  }
}

/* Create New Task */
export const createTask = async (
  previousState: FormState,
  formData: FormData
): Promise<FormState> => {
  //only allow logged in users to create tasks
  const session = await verifySession()
  if (!session)
    return {
      success: false,
      message: "Unauthorized access attempt.",
    }

  const formDataObject = Object.fromEntries(formData.entries())
  const validationResult = CreateTaskSchema.safeParse(formDataObject)

  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.error.errors[0]?.message || "Invalid data",
    }
  }

  const payload = {
    userId: session.user.id,
    title: validationResult.data.title,
    categoryId:
      validationResult.data.categoryId === ""
        ? null
        : validationResult.data.categoryId,
    description: validationResult.data.description,
    dueDate: validationResult.data.dueDate,
  }

  try {
    const response = await fetch(`${BackendUrl}/tasks`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      console.error(
        `Failed to create task: ${response.status} ${response.statusText}`
      )
      return {
        success: false,
        message: "Failed to create task",
      }
    }
    revalidatePath("/dashboard")
    return {
      success: true,
      message: "Task created successfully",
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating task:", error.message)
    }
    return {
      success: false,
      message: "Failed to create task",
    }
  }
}

export const toggleTask = async (taskId: string) => {
  const session = await verifySession()
  if (!session) return null

  try {
    const response = await fetch(`${BackendUrl}/tasks/toggle/${taskId}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${session.accessToken}`,
      },
    })
    if (!response.ok) {
      console.error(`Error: ${response.statusText}`)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error toggling task:", error.message)
    }
  } finally {
    revalidatePath("/dashboard")
  }
}

export const updateTask = async (
  previousState: FormState,
  formData: FormData
) => {
  const session = await verifySession()
  if (!session)
    return {
      success: false,
      message: "Unauthorized access attempt.",
    }

  const formDataObject = Object.fromEntries(formData.entries())

  const validationResult = UpdateTaskSchema.safeParse(formDataObject)

  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.error.errors[0]?.message || "Invalid data",
    }
  }

  const payload = {
    taskId: validationResult.data.taskId,
    userId: session.user.id,
    title: validationResult.data.title,
    description: validationResult.data.description,
    categoryId:
      validationResult.data.categoryId === ""
        ? null
        : validationResult.data.categoryId,
    dueDate: validationResult.data.dueDate,
  }

  try {
    const response = await fetch(`${BackendUrl}/tasks/${payload.taskId}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error(
        `Failed to update task: ${response.status} ${response.statusText}`
      )
      return {
        success: false,
        message: "Failed to update task",
      }
    }
    revalidatePath("/dashboard")
    return {
      success: true,
      message: "Task updated successfully",
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleted category:", error.message)
    }
    return {
      success: false,
      message: "Failed to update task",
    }
  }
}

export const deleteTask = async (
  previousState: FormState,
  formData: FormData
) => {
  const session = await verifySession()
  if (!session)
    return { success: false, message: "Unauthorized access attempt." }

  const id = formData.get("id")
  if (!id) {
    return { success: false, message: "Invalid data" }
  }

  try {
    const response = await fetch(`${BackendUrl}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${session.accessToken}`,
      },
    })
    if (!response.ok) {
      console.error(`Error: ${response.statusText}`)
      return {
        success: false,
        message: "Failed to delete task",
      }
    }

    revalidatePath("/dashboard")
    return {
      success: true,
      message: "Task deleted successfully",
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting task:", error.message)
    }
    return {
      success: false,
      message: "Failed to delete task",
    }
  }
}
