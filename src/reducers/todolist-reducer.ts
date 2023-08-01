import {TodoListType} from "../App";

export type  RemoveTodolistAT = {
    type: "REMOVE-TODOLIST",
    todolistId: string
}
export const todolistReducer = (todolists: Array<TodoListType>, action: RemoveTodolistAT): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.todolistId)
        default:
            return  todolists
    }
}