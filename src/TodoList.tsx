import {filterValuesType} from "./App";
import {useState, KeyboardEvent, ChangeEvent} from "react";
import {Button} from "./Button";
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
    const [error, setError] = useState<string | null>('')
    const [buttonName, setButtonName] = useState<filterValuesType>('all')

    const addTaskHandler = () => {
        if (newTitle.trim()) {
            props.addTask(props.todolistId, newTitle.trim())
            setNewTitle('')
        } else {
            setError('Tittle is required')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTaskHandler()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTitle(e.currentTarget.value)
    }

    const changeFilterHandler = (filterValue: filterValuesType) => {
        props.changeFilter(props.todolistId, filterValue)
        setButtonName(filterValue)

    }

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
                    <Button name={'X'} callBack={removeTaskHandler}/>
                </li>
            )
        }
    )
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
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
            </div>
            {error && <div className={styles.errorMessage} >{ error }</div>}
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <button className={buttonName === 'all' ? styles.activeFilter : ''}
                        onClick={() => changeFilterHandler('all')}>All
                </button>
                <button className={buttonName === 'active' ? styles.activeFilter : ''}
                        onClick={() => changeFilterHandler('active')}>Active
                </button>
                <button className={buttonName === 'completed' ? styles.activeFilter : ''}
                        onClick={() => changeFilterHandler('completed')}>Completed
                </button>
            </div>
        </div>
    );

};

export default TodoList;