import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";


export type ActionTasksReducerType = removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType

export const tasksReducer = (state: TasksStateType, action: ActionTasksReducerType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId2]: state[action.payload.todolistId2].filter(el => el.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todolistId2]: [newTask, ...state[action.payload.todolistId2]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.title
                } : el)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            let stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        default:
            return state
    }
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const removeTaskAC = (taskId: string, todolistId2: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todolistId2
        }
    } as const
}
export const addTaskAC = (title: string, todolistId2: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId2
        }
    } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId,
            isDone,
            todolistId
        }
    } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskId,
            title,
            todolistId
        }
    } as const
}
