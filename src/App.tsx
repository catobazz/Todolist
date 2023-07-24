import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

//Create {...tasks, newTask}
//Read   tasks.map(t=>JSX.Element)
//Update tasks.map(t=>condition ? {...t, key: newValue} : t)
//Delete tasks.filter(t=>condition)

type TodolistStateType = {
    [key: string]: Array<TaskType>
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
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    })

    const addTask = (todolistId: string, newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el=>el.id!==todolistId))
        delete tasks[todolistId]
    }
    const changeFilter = (todolistId: string, value: filterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }
    const changeStatus = (todolistId: string, taskId: string, checkedValue: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: checkedValue} : el)
        })
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
                    removeTodolist={removeTodolist}
                    filter={el.filter}
                />
            })}
        </div>
    );
}

export default App;
