import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

//Create {...tasks, newTask}
//Read   tasks.map(t=>JSX.Element)
//Update tasks.map(t=>condition ? {...t, key: newValue} : t)
//Delete tasks.filter(t=>condition)

export type filterValuesType = "all" | "active" | "completed"

function App() {
    const title: string = "What to learn"

    const [tasks, setTasks] = useState<TaskType[]>([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ]
    )
    const [filter, setFilter] = useState<filterValuesType>("completed")
    const changeFilter = (filter: filterValuesType) => {
        setFilter(filter)
    }
    const removeTask = (taskId: string) => {
        const updatedTask = tasks.filter((task) => task.id !== taskId)
        setTasks(updatedTask)
    }

    function addTask() {
        let newTask = {id: v1(), title: 'NEW TASK', isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
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
            />
        </div>
    );
}

export default App;
