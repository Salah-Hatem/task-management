import { getTasks } from "../../data-access/tasks"
import { getUser } from "../../data-access/user"
import { getCategories } from "../../data-access/categories"
import DashboardPageContent from "../../components/dashboard/dashboard-content"

type DashboardPageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}
const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const { page } = await searchParams
  const pageNumber = page ?? 0
  // TODO: Add Pagination
  const [user, taskResult, categories] = await Promise.all([
    getUser(),
    getTasks(pageNumber),
    getCategories(),
  ])

  const tasks = taskResult?.data ?? []
  const categoryList = categories ?? []

  return (
    <DashboardPageContent
      user={user}
      allTasks={tasks}
      categories={categoryList}
    />
  )
}

export default DashboardPage
