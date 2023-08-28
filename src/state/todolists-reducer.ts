import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type ActionTodolistsReducerType = RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType

export const todolistsReducer = (state: TodolistType[], action: ActionTodolistsReducerType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.payload.id)
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el=> el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        default:
            return state
    }
}

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}
export const addTodolistAC = (title: string ) => {
    let todolistId = v1()
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
        todolistId
        }
    } as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    } as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    } as const
}