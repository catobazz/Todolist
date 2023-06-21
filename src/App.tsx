import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

function App(): JSX.Element {

    const todolist_1 = v1()
    const todolist_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todolist_1, title: "What to learn", filter: 'all'},
        {id: todolist_2, title: "What to buy", filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolist_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
        ],
        [todolist_2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Book", isDone: false},
        ]
    })

    const changeTodolistFilter = (todolistId: string, nextFilterValue: FilterValuesType) => {
        const updatedTodoLists: Array<TodolistType> = todoLists.map(el => el.id === todolistId ? {...el, filter: nextFilterValue } : el)
        setTodoLists(updatedTodoLists)
    }

    const removeTask = (todolistId: string, taskId: string) => {
        const nextTasksState: Array<TaskType> = tasks.filter((t) => t.id !== taskId)
        setTasks(nextTasksState)
    }

    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t))
    }

    const getFilteredTasks =
        (allTasks: Array<TaskType>, currentFilterValue: FilterValuesType): Array<TaskType> => {
            if (currentFilterValue === "completed") {
                return allTasks.filter(t => t.isDone)
            } else if (currentFilterValue === "active") {
                return allTasks.filter(t => !t.isDone)
            } else {
                return allTasks
            }
        }

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

    return (
        <div className="App">
            {
                todoLists.map(el => {

                    return (
                        <TodoList
                            key={el.id}
                            id={el.id}
                            title={el.title}
                            filter={el.filter}
                            tasks={filteredTasks}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeFilter={changeTodolistFilter}
                            changeTaskStatus={changeTaskStatus}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
