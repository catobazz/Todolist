import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList, {TaskType} from "./TodoList";


//Create {...tasks, newTask}
//Read   tasks.map(t=>JSX.Element)
//Update tasks.map(t=>condition ? {...t, key: newValue} : t)
//Delete tasks.filter(t=>condition)

export type filterValuesType = "all" | "active" | "completed"

function App() {
    const title: string = "What to learn"

    const [tasks, setTasks] = useState([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQl", isDone: false},
        ]
    );
    const addTask = (newTitle:string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const [filter, setFilter] = useState<filterValuesType>("all")
    const changeFilter = (filter: filterValuesType) => {
        setFilter(filter)
    }
    const removeTask = (taskId: string) => {
        const updatedTask = tasks.filter((task) => task.id !== taskId)
        setTasks(updatedTask)
    }
    const changeStatus = (taskId:string, checkedValue: boolean)=> {
        setTasks(tasks.map(el=>el.id===taskId ? {...el, isDone:checkedValue} : el))
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: filterValuesType): Array<TaskType> => {
        if (filter === "active") {
            return tasks.filter(t => !t.isDone)
        } else if (filter === "completed") {
            return tasks.filter(t => t.isDone)
        } else {
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
                addTask={addTask}
                changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
