"use client"
import { useState } from "react"
import { CategoryType } from "../../../types/formStateType"

type Props = {
  categories: CategoryType[]
  selectedCategoryId?: string | null
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const CategorySelector = ({
  categories,
  selectedCategoryId,
  onChange,
}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryId)

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value)
    if (onChange) {
      onChange(event)
    }
  }

  return (
    <select
      name="categoryId"
      id="categoryId"
      // defaultValue={selectedCategoryId || ""}
      value={selectedCategory || ""}
      onChange={handleCategoryChange}
    >
      <option value="">Select Catgegory</option>
      {categories &&
        categories.map((category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          )
        })}
    </select>
  )
}
export default CategorySelector
