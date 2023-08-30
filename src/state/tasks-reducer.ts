import {TasksStateType} from '../App';

type ActionsType = removeTodolistACType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'XXX':
            return state
        default:
            return state
    }
}

type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'XXX',
        payload: {
        }
    }
}
