import {filterValuesType} from "./App";
import {useState, KeyboardEvent, ChangeEvent} from "react";
import {Button} from "./Button";

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

    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTaskHandler()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const changeFilterHandler = (filterValue: filterValuesType) =>{
       props.changeFilter(filterValue)

    }

    const mappedTasks =  props.tasks.map(task => {
        const removeTaskHandler = () => {
            props.removeTask(task.id)
        }
        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id,e.currentTarget.checked)
        }
            return (
                <li key={task.id}>
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
                <input onKeyPress={onKeyPressHandler} value={newTitle} onChange={onChangeHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {mappedTasks}

            </ul>
            <div>
                <button onClick={()=>changeFilterHandler('all')}>All
                </button>
                <button onClick={()=>changeFilterHandler('active')}>Active
                </button>
                <button onClick={()=>changeFilterHandler('completed')}>Completed
                </button>
            </div>
        </div>
    );

};

export default TodoList;