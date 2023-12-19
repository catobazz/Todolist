import axios from 'axios'

const instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.1'
    }
)

type TodoType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}

export const todolistAPI = {
    getTodos() {
        return instance.get<TodoType[]>(`/todo-lists`)
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{ item: TodoType }>>(`/todo-lists`, {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },

    updateTodo(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
    },
}
