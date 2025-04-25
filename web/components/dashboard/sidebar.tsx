"use client"
import Image from "next/image"
import { useState } from "react"
import { FaExpandAlt } from "react-icons/fa"
import { TbCategoryPlus } from "react-icons/tb"
import CreateCategoryDialog from "./categories/create-category-dialog"
import { FaBars } from "react-icons/fa"
import { IoMdCloseCircle } from "react-icons/io"

const SideBar = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <>
      <FaBars
        size={24}
        className="mobile-menu bars"
        onClick={handleSidebarToggle}
      />
      <div
        className={`sidebar ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"} `}
      >
        <IoMdCloseCircle
          size={24}
          className="mobile-menu"
          onClick={handleSidebarToggle}
        />
        <div className="logo-container">
          <Image width={40} height={40} src="/Task_logo.svg" alt="logo" />
          {isSidebarOpen && <h2>Task Management App</h2>}
        </div>
        <span className="nav-icon" onClick={handleSidebarToggle}>
          <FaExpandAlt />
        </span>
        <hr />
        <div className="sidebar-group">
          <div className="group-title">
            <TbCategoryPlus size={32} />
            {isSidebarOpen && <h3>My Categories</h3>}
            {isSidebarOpen && <CreateCategoryDialog />}
          </div>
          {isSidebarOpen && <div>{children}</div>}
        </div>
      </div>
    </>
  )
}

export default SideBar
