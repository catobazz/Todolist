import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

//Create {...tasks, newTask}
//Read   tasks.map(t=>JSX.Element)
//Update tasks.map(t=>condition ? {...t, key: newValue} : t)
//Delete tasks.filter(t=>condition)

type TodolistsType = {
    id: string,
    title: string
    filter: filterValuesType
}
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
    const addTask = (newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeFilter = (todolistId: string, value: filterValuesType) => {
        setTodolists(todolists.map(el => el.id===todolistId ? {...el, filter:value } : el))
    }
    const removeTask = (taskId: string) => {
        const updatedTask = tasks.filter((task) => task.id !== taskId)
        setTasks(updatedTask)
    }
    const changeStatus = (taskId: string, checkedValue: boolean) => {
        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: checkedValue} : el))
    }

    let [todolists, setTodolists] = useState<TodolistsType[]>(
        [
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ]
    )
    return (
        <div className="App">
            {todolists.map(el => {
                let tasksForTodolist = tasks;
                if (el.filter === "active") {
                    tasksForTodolist = tasks.filter(t => !t.isDone)
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks.filter(t => t.isDone)
                }

                return <TodoList
                    key={el.id}
                    todolistId={el.id}
                    tasks={tasksForTodolist}
                    title={el.title}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    // filter={el.filter}
                />
            })}
        </div>
    );
}

export default App;
