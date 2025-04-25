"use client"
import { useEffect, useState } from "react"
import CategorySelector from "./categories/category-selector"
import CreateTaskDialog from "./tasks/create-task-dialog"
import Tasks from "./tasks/tasks"
import { CategoryType } from "../../types/formStateType"
import SignOutButton from "../sign-out-button"
import { User } from "../../types/userType"

type DashboardPageContentProps = {
  user: User | null
  allTasks: any[]
  categories: CategoryType[]
}

const DashboardPageContent = ({
  user,
  allTasks,
  categories,
}: DashboardPageContentProps) => {
  console.log("user", user)

  const [filteredTasks, setFilteredTasks] = useState(allTasks)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    if (selectedCategory) {
      setFilteredTasks(
        allTasks.filter((task) => task.categoryId === selectedCategory)
      )
    } else {
      setFilteredTasks(allTasks)
    }
  }, [selectedCategory, allTasks])

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value === "" ? null : event.target.value
    setSelectedCategory(selectedValue)
  }

  return (
    <div className="content">
      <header className="dashboard-header">
        <div className="mobile-header">
          <img
            className="profile-img"
            src={user?.linkedinImage}
            alt="profile"
          />
          <div>
            <h3 className="display-name">
              {user?.linkedinName === "" ? user?.name : user?.linkedinName}
            </h3>
            <p className="email-text">{user?.email}</p>
          </div>
          <SignOutButton>Signout</SignOutButton>
        </div>
        {/* <div className="user-message">
          {user && <p>Welcome, {user.name}</p>}
          <SignOutButton>Signout</SignOutButton>
        </div> */}
        <div className="header-buttons-container">
          <CreateTaskDialog categories={categories} />
          <CategorySelector
            categories={categories}
            selectedCategoryId={selectedCategory}
            onChange={handleCategoryChange}
          />
        </div>
      </header>

      <main>
        <Tasks categories={categories} initialTasks={filteredTasks} />
      </main>
    </div>
  )
}

export default DashboardPageContent
