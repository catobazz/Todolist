import React from 'react';
import './App.css';
// import  {TaskType} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container} from "@mui/material";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    // changeTodolistFilterAC, changeTodolistTitleAC,
    // removeTodolistAC,
} from "./state/todolists-reducer";
// import {
//     addTaskAC,
//     changeTaskStatusAC,
//     changeTaskTitleAC,
//     removeTaskAC,
// } from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import TodoListWithRedux from "./TodoListWithRedux";

//Create {...tasks, newTask}
//Read   tasks.map(t=>JSX.Element)
//Update tasks.map(t=>condition ? {...t, key: newValue} : t)
//Delete tasks.filter(t=>condition)

// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
export type TodolistType = {
    id: string,
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed"

function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    // let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    // const addTask = (todolistId: string, newTitle: string) => {
    //     dispatch(addTaskAC(newTitle, todolistId))
    // }
    // const removeTask = (todolistId: string, taskId: string) => {
    //     dispatch(removeTaskAC(taskId, todolistId))
    // }
    // const removeTodolist = (todolistId: string) => {
    //     const action = removeTodolistAC(todolistId)
    //     dispatch(action)
    // }
    // const changeFilter = (todolistId: string, value: FilterValuesType) => {
    //     dispatch(changeTodolistFilterAC(todolistId, value))
    // }
    // const changeStatus = (todolistId: string, taskId: string, checkedValue: boolean) => {
    //     dispatch(changeTaskStatusAC(taskId, checkedValue, todolistId))
    // }
    const addTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)
    }
    // const updateTitleTodolist = (todolistId: string, updateTitle: string) => {
    //     dispatch(changeTodolistTitleAC(todolistId, updateTitle))
    // }
    // const updateTitleTask = (todolistId: string, taskId: string, updateTitle: string) => {
    //     dispatch(changeTaskTitleAC(taskId, updateTitle, todolistId))
    // }
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



                        return (
                            <Grid key={el.id} item>
                                <Paper elevation={3} style={{padding: '10px'}}>
                                    <TodoListWithRedux
                                        todolist = {el}
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

export default AppWithRedux;
