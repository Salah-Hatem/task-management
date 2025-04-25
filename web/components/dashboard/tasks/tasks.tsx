import Task from "./task"
import { TaskType } from "../../../types/taskType"
import { CategoryType } from "../../../types/formStateType"

type Props = {
  initialTasks: TaskType[]
  categories: CategoryType[] | null
}
const Tasks = ({ initialTasks, categories }: Props) => {
  return (
    <div className="tasks-container">
      {initialTasks &&
        initialTasks.map((task) => (
          <Task categories={categories} key={task.id} task={task} />
        ))}
    </div>
  )
}
export default Tasks
