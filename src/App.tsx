import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

    //Create {...tasks, newTask}
    //Read   tasks.map(t=>JSX.Element)
    //Update tasks.map(t=>)
    //Delete

type filterValuesType = "all" | "active" | "completed"
function App() {
    const title: string = "What to learn"

    const [tasks, setTasks] = useState<TaskType[]>([
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "React", isDone: false},
        ]
    )
    const [filter, setFilter] = useState<filterValuesType>("completed")
    const changeFilter = (filter: filterValuesType) => {
        setFilter(filter)
    }
    const removeTask = (taskId: number) => {
        const updatedTask = tasks.filter((task) => task.id !== taskId)
        setTasks(updatedTask)

    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: filterValuesType): Array<TaskType> =>
    {
        switch (filter) {
            case "active":
                return  tasks.filter(t=> !t.isDone)
            case "completed":
                return tasks.filter(t=> t.isDone)
            default:
                return tasks
        }
    }
    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

    return (
        <div className="App">
            <TodoList
                tasks={filteredTasks}
                title={title}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
