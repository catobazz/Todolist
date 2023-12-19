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

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
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


    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TodoType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}
