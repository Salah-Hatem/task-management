// "use client"

import UpdateCategoryDialog from "./update-category-dialog"
import DeleteButton from "../delete-button"
import { deleteCategory, getCategories } from "../../../data-access/categories"

const CategoryList = async () => {
  const initialcategories = await getCategories()
  const categories = initialcategories
  return (
    <ul>
      {categories &&
        categories.map((category) => {
          return (
            <li className="category-item" key={category.id} id={category.id}>
              {category.name}
              <div className="category-actions">
                <UpdateCategoryDialog
                  categoryId={category.id}
                  categoryName={category.name}
                />
                <DeleteButton
                  formAction={deleteCategory}
                  itemId={category.id}
                />
              </div>
            </li>
          )
        })}
    </ul>
  )
}
export default CategoryList
