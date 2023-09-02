import React from 'react';
import './App.css';
import {TaskType} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, store} from "./state/store";
import {TodolistWithRedux} from "./TodolistWithRedux";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    //const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    let dispatch = useDispatch()

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>

                                    <TodolistWithRedux
                                        todolist={tl}
                                    />

                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
