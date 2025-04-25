import { z } from "zod"

const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  dueDate: z.date().nullable(),
  done: z.boolean(),
  categoryId: z.string().nullable(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  category: z
    .object({
      id: z.string(),
      name: z.string(),
      userId: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
    .nullable(),
})

const Meta = z.object({
  total: z.number(),
  lastPage: z.number(),
  currentPage: z.number(),
  totalPerPage: z.number(),
  prevPage: z.number().nullable(),
  nextPage: z.number().nullable(),
})

export type TaskType = z.infer<typeof TaskSchema>
export type MetaType = z.infer<typeof Meta>
export type PaginateOutputType = {
  data: TaskType[]
  meta: MetaType
}
