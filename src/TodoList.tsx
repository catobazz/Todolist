import {filterValuesType} from "./App";
import {useState, KeyboardEvent, ChangeEvent} from "react";
import styles from "./TodoList.module.css"

export type  TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: filterValuesType) => void
    addTask: (todolistId: string, newTitle: string) => void
    changeStatus: (todolistId: string, taskId: string, checkedValue: boolean) => void
    removeTodolist: (todolistId: string) => void
    filter: filterValuesType
}

const TodoList = (props: TodoListPropsType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | false>(false)

    const addTaskHandler = () => {
        if (newTitle.trim() !== "") {
            props.addTask(props.todolistId, newTitle.trim())
            setNewTitle('')
        } else {
            setError("Title is required")
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTaskHandler()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTitle(e.currentTarget.value)
    }

    const removeTodolistHandler = () => props.removeTodolist(props.todolistId)

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");

    const mappedTasks = props.tasks.map(task => {
            const removeTaskHandler = () => {
                props.removeTask(props.todolistId, task.id)
            }
            const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeStatus(props.todolistId, task.id, e.currentTarget.checked)
            }

            return (
                <li key={task.id} className={task.isDone ? styles.isDone : ''}>
                    <input type="checkbox" checked={task.isDone} onChange={changeStatusHandler}/>
                    <span>{task.title}</span>
                    <button onClick={removeTaskHandler}>x</button>
                </li>
            )
        }
    )

    return (
        <div className="todolist">
            <h3>{props.title}
                <button onClick={removeTodolistHandler}>x</button>
            </h3>
            <div>
                <input className={error ? styles.error : ''}
                       onKeyPress={onKeyPressHandler}
                       value={newTitle}
                       onChange={onChangeHandler}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
            <ul>
                {mappedTasks}

            </ul>
            <div>
                <button className={props.filter === 'all' ? styles.activFilter : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? styles.activFilter : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? styles.activFilter : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );

};

export default TodoList;