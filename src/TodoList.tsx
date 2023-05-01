import React, {FC} from "react";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (filter: filterValuesType) => void
}

export type  TaskType = {
    id: number
    title: string
    isDone: boolean
}


const TodoList: FC<TodoListPropsType> = ({
                                             tasks,
                                             title,
                                             removeTask,
                                             changeFilter
                                         }) => {
    const tasksJSX: Array<JSX.Element> = tasks.map((task) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => removeTask(task.id)}>x</button>
            </li>
        )
    })
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button
                    onClick={}>All
                </button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );

};

export default TodoList;