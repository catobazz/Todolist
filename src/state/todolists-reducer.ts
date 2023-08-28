import {TodolistType} from "../App";
import {v1} from "uuid";

export type ActionType = removeTodolistACType
    | addTodolistACType
export const todolistsReducer = (state: TodolistType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.payload.id)
        case 'ADD-TODOLIST':
            const todolist = v1()
            const newTodolist: TodolistType = {id: todolist, title: action.payload.title, filter: 'all'}
            return [newTodolist, ...state]
        // case 'CHANGE-TODOLIST-FILTER':
        //     return state
        // case 'UPDATE-TODOLIST-TITLE':
        //     return state
        default:
            return state
    }
}

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title}
    } as const
}