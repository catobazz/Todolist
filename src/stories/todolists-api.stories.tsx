import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodos()
            .then((res) => setState(res.data))
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'REACT'
        todolistAPI.createTodo(title)
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'ae125e5f-7934-454e-b475-211ca799bea7'
        todolistAPI.deleteTodo(todolistId)
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'REACTOR'
        const todolistId = 'd0ab5e2a-1182-41f7-a92e-ced9454c6265'
        todolistAPI.updateTodo(todolistId, title)
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}



export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '809dba74-2829-4a3a-92f3-bb77b2c72a16'
        todolistAPI.getTasks(todolistId)
            .then((res) => setState(res.data.items))
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '809dba74-2829-4a3a-92f3-bb77b2c72a16'
        const title = 'What do you learn?'
        todolistAPI.createTask(todolistId, title)
            .then((res) => setState(res.data.data.item))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '809dba74-2829-4a3a-92f3-bb77b2c72a16'
        const taskId = '050bad97-053c-430a-a336-bd5d0961f7d7'
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'Its updated title'
        const todolistId = '809dba74-2829-4a3a-92f3-bb77b2c72a16'
        const taskId = '14b96865-cdd2-4c88-b770-22b4cd9046ac'
        todolistAPI.updateTask(todolistId, taskId, title)
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
