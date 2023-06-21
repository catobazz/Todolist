import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

//Create {...tasks, newTask}
//Read   tasks.map(t=>JSX.Element)
//Update tasks.map(t=>condition ? {...t, key: newValue} : t)
//Delete tasks.filter(t=>condition)

type TodolistStateType = {
    [key: string]:Array<TaskType>
}
type TodolistsType = {
    id: string,
    title: string
    filter: filterValuesType
}
export type filterValuesType = "all" | "active" | "completed"

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TodolistStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const addTask = (newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        // setTasks([newTask, ...tasks])
    }

    const changeFilter = (todolistId: string, value: filterValuesType) => {
        setTodolists(todolists.map(el => el.id===todolistId ? {...el, filter:value } : el))
    }
    const removeTask = (taskId: string) => {
        // const updatedTask = tasks.filter((task) => task.id !== taskId)
        // setTasks(updatedTask)
    }
    const changeStatus = (taskId: string, checkedValue: boolean) => {
        // setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: checkedValue} : el))
    }


    return (
        <div className="App">
            {todolists.map(el => {

                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(el => !el.isDone)
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(el => el.isDone)
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
                    filter={el.filter}
                />
            })}
        </div>
    );
}

export default App;
