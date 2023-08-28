import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

//Create {...tasks, newTask}
//Read   tasks.map(t=>JSX.Element)
//Update tasks.map(t=>condition ? {...t, key: newValue} : t)
//Delete tasks.filter(t=>condition)

type TodolistStateType = {
    [key: string]: Array<TaskType>
}
export type TodolistType = {
    id: string,
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed"

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
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
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }
    const changeStatus = (todolistId: string, taskId: string, checkedValue: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: checkedValue} : el)
        })
    }
    const addTodolist = (newTitle: string) => {
        const todolist = v1()
        const newTodolist: TodolistType = {id: todolist, title: newTitle, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolist]: []})
    }
    const updateTitleTodolist = (todolistId: string, updateTitle: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title: updateTitle} : t))
    }
    const updateTitleTask = (todolistId: string, taskId: string, updateTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: updateTitle} : el)
        })
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

export default App;
