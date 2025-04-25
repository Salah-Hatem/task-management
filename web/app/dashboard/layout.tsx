import SideBar from "../../components/dashboard/sidebar"
import CategoryList from "../../components/dashboard/categories/category-list"

export default async function DashboradLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-container">
      <SideBar>
        <CategoryList />
      </SideBar>
      {children}
    </div>
  )
}
