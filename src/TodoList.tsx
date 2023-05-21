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
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: filterValuesType) => void
    addTask: (newTitle: string) => void
    changeStatus: (taskId:string, checkedValue: boolean)=>void
}


const TodoList = (props: TodoListPropsType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState(false)
    const [buttonName, setButtonName] = useState<filterValuesType>('all')

    const addTaskHandler = () => {
        if (newTitle.trim()) {
            props.addTask(newTitle.trim())
            setNewTitle('')
        } else {
            setError(true)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTaskHandler()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTitle(e.currentTarget.value)
    }

    const changeFilterHandler = (filterValue: filterValuesType) =>{
       props.changeFilter(filterValue)
        setButtonName(filterValue)

    }

    const mappedTasks =  props.tasks.map(task => {
        const removeTaskHandler = () => {
            props.removeTask(task.id)
        }
        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id,e.currentTarget.checked)
        }
            return (
                <li key={task.id} className={task.isDone ? styles.isDone : ''}>
                    <input type="checkbox" checked={task.isDone} onChange={changeStatusHandler}/>
                    <span>{task.title}</span>
                    <Button name={'X'} callBack={removeTaskHandler} />
                    {/*<button onClick={() =>onClickHandler(task.id) }>x</button>*/}
                </li>
            )
        }
    )
    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input className={error ?  styles.error : ''}
                       onKeyPress={onKeyPressHandler}
                       value={newTitle}
                       onChange={onChangeHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {mappedTasks}

            </ul>
            <div>
                <button className={buttonName==='all' ? styles.activFilter : ''} onClick={()=>changeFilterHandler('all')}>All
                </button>
                <button className={buttonName==='active' ?  styles.activFilter : ''} onClick={()=>changeFilterHandler('active')}>Active
                </button>
                <button className={buttonName==='completed' ?  styles.activFilter : ''} onClick={()=>changeFilterHandler('completed')}>Completed
                </button>
            </div>
        </div>
    );

};

export default TodoList;