import {TasksStateType} from '../App';

export type Action1Type = {
    type: '1',
    id: string
}
export type Action2Type = {
    type: '2',
    id: string
}

type ActionsType = Action1Type | Action2Type
export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case '1':
            return {...state}
        case '2':
            return {...state}
        default:
            return {...state}
    }
}

export const action1AC = (taskId: string, todolistId: string) => {
    return {type: '1', id: todolistId }
}
export const action2AC = (title: string) => {
    return {type: '1', title: title }
}
