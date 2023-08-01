import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Container,
    createTheme, CssBaseline,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {amber, teal} from "@mui/material/colors";

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App(): JSX.Element {
    // BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [isLightMode, setIsLightMode] = useState<boolean>(true)
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Ice cream", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Water", isDone: false},
        ]
    })

    const changeTodoListFilter = (nextFilterValue: FilterValuesType, todoListId: string) => {
        const updatedTodoLists: Array<TodoListType>
            = todoLists.map(tl => tl.id === todoListId ? {...tl, filter: nextFilterValue} : tl)
        setTodoLists(updatedTodoLists)
    }
    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId)
        })
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todoListId: string) => {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId
                ? {...t, isDone: newIsDoneValue}
                : t)
        })
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId
                ? {...t, title: newTitle}
                : t)
        })
    }
    const changeTodolistTitle = (newTitle: string, todoListId: string) => {
        const updatedTodoLists: Array<TodoListType>
            = todoLists.map(tl => tl.id === todoListId ? {...tl, title: newTitle} : tl)
        setTodoLists(updatedTodoLists)
    }
    const removeTodoList = (todoListId: string) => {
        const updatedTodoLists: Array<TodoListType> = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(updatedTodoLists)
        const copyTasks = {...tasks}
        delete copyTasks[todoListId]
        setTasks(copyTasks)
    }

    const addTodolist = (title: string) => {
        const newTodoId = v1()
        const newTodo: TodoListType = {id: newTodoId, title: title, filter: "all"}
        setTodoLists([...todoLists, newTodo])
        setTasks({...tasks, [newTodoId]: []})
    }


    // UI
    const getFilteredTasks =
        (allTasks: Array<TaskType>, currentFilterValue: FilterValuesType): Array<TaskType> => {
            switch (currentFilterValue) {
                case "completed":
                    return allTasks.filter(t => t.isDone)
                case "active":
                    return allTasks.filter(t => !t.isDone)
                default:
                    return allTasks
            }
        }

    const todoListsComponents: Array<JSX.Element> = todoLists.map((tl) => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter)

        return (
            <Grid item>
                <Paper elevation={4}>
            <TodoList
                key={tl.id}
                todoListId={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={filteredTasks}
                addTask={addTask}
                removeTask={removeTask}
                removeTodoList={removeTodoList}
                changeFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}
            />
                </Paper>
            </Grid>

        )
    })
const mode = isLightMode ? "light" : "dark"
const customTheme = createTheme({
    palette: {
        primary: teal,
        secondary: amber,
        mode: mode
    }
})
    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton
                        size={'large'}
                        edge={'start'}
                        color={'inherit'}
                        aria-label={'menu'}
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'} component={'div'} sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    <Button
                        onClick={()=>setIsLightMode(!isLightMode)}
                        size={'small'}
                        color={'inherit'}
                        sx={{mr: '15px'}}
                    >
                        {isLightMode ? 'Set dark' : 'Set light'}
                    </Button>
                    <Button
                    size={'small'}
                    color={'inherit'}
                    >LogOut</Button>
                </Toolbar>
            </AppBar>

            <Container>
                <Grid container sx={{p: '15px 0'}}>
                    <Paper elevation={4}>
                <div className={"add-form"}>
                    <AddItemForm maxTaskTitleLength={15} addItem={addTodolist}/>
                </div>
                    </Paper>
                </Grid>
                <Grid container spacing={2}>
                {todoListsComponents}
                </Grid>
            </Container>
        </div>
        </ThemeProvider>
    );
}

export default App;
