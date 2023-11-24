import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}

const baseUrl = 'https://social-network.samuraijs.com/api/1.1'
const config = {withCredentials: true}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const promise = axios.get(`${baseUrl}/todo-lists`, config)
        promise.then((res) => setState(res.data))
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'REACT'
        axios.post(`${baseUrl}/todo-lists`, {title}, config)
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'ae125e5f-7934-454e-b475-211ca799bea7'
        axios.delete(`${baseUrl}/todo-lists/${todolistId}`, config)
            .then((res) => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'REACTOR'
        const todolistId = 'd0ab5e2a-1182-41f7-a92e-ced9454c6265'
        axios.put(`${baseUrl}/todo-lists/${todolistId}`, {title},  config)
            .then((res) => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

