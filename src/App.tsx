import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList";
import {v1} from "uuid";

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "completed" | "active";

type TasksObjStateType = {
    [key: string]: TaskType[]
}

function App() {

    /*removeTasks принимает id из массива*/
    function removeTasks(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id) /*пропускает все id которые !== той которую надо удалить. Передает новый массив в setTasks для отправки в стейт на перерисовку*/
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj});
    }

    /*-----------------------------------------------*/
    function addTask(title: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }
    }

    /*для фильтра отображения тасок------------------*/
    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todoList = todolists.find(tl => tl.id === todolistId)
        if (todoList) {
            todoList.filter = value
            setTodolists([...todolists])
        }
    }

    const removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(t => t.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})

    }

    /*-----------------------------------------------*/
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasksObj, setTasks] = useState<TasksObjStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    return (
        <div className="App">
            <input/> <button>x</button>
                {
                    todolists.map(ts => {

                        let tasksForTodolist = tasksObj[ts.id]; /*сюда пришел массив из useState*/
                        if (ts.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                        }
                        if (ts.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                        }
                        return <TodoList
                            key={ts.id}
                            id={ts.id}
                            title={ts.title}
                            tasks={tasksForTodolist}
                            removeTasks={removeTasks}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={ts.filter}
                            removeTodolist={removeTodolist}
                        />
                    })
                }
                {/*отрисовывает JSX из компоненты todolist (передает в todolist паремтры title и tasksObj через props)*/}
        </div>
);
}

export default App;
