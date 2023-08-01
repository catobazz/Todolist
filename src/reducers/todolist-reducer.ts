import {TodoListType} from "../App";

export type TodolistReducerAT = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT

export type  RemoveTodolistAT = {
    type: "REMOVE-TODOLIST",
    todolistId: string
}
export type AddTodolistAT = {
    type: "ADD-TODOLIST",
    title: string
    todolistId: string
}
export type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string
    todolistId: string
}

export const todolistReducer = (todolists: Array<TodoListType>, action: TodolistReducerAT): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.todolistId)
        case "ADD-TODOLIST":
            const newTodo: TodoListType = {id: action.todolistId, title: action.title, filter: "all"}
            return [...todolists, newTodo]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        default:
            return  todolists
    }
}