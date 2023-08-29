import React, {useReducer} from 'react';
import {v1} from 'uuid';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";

//Create {...tasks, newTask}
//Read   tasks.map(t=>JSX.Element)
//Update tasks.map(t=>condition ? {...t, key: newValue} : t)
//Delete tasks.filter(t=>condition)

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type TodolistType = {
    id: string,
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed"

function AppWithReducer() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        dispatchToTasks(addTaskAC(newTitle, todolistId))
    }
    const removeTask = (todolistId: string, taskId: string) => {
        dispatchToTasks(removeTaskAC(taskId, todolistId))
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        dispatchToTodolists(changeTodolistFilterAC(todolistId, value))
    }
    const changeStatus = (todolistId: string, taskId: string, checkedValue: boolean) => {
        dispatchToTasks(changeTaskStatusAC(taskId, checkedValue, todolistId))
    }
    const addTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const updateTitleTodolist = (todolistId: string, updateTitle: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, updateTitle))
    }
    const updateTitleTask = (todolistId: string, taskId: string, updateTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(taskId, updateTitle, todolistId))
    }
    return (
        <div className="App">
            <ButtonAppBar/>

            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <Paper elevation={3} style={{padding: '10px'}}>
                        <AddItemForm
                            itemFormCallback={addTodolist}
                        />
                    </Paper>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {

                        let tasksForTodolist = tasks[el.id];

                        if (el.filter === "active") {
                            tasksForTodolist = tasks[el.id].filter(el => !el.isDone)
                        }
                        if (el.filter === "completed") {
                            tasksForTodolist = tasks[el.id].filter(el => el.isDone)
                        }

                        return (
                            <Grid item>
                                <Paper elevation={3} style={{padding: '10px'}}>
                                    <TodoList
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
                                        updateTitleTask={updateTitleTask}
                                        updateTitleTodolist={updateTitleTodolist}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithReducer;
