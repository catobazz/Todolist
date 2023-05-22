import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../App";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export type TaskType = { /*тип тасок в PropsType*/ /*экспортируем тип тасок в task1 и task2 (в App)*/
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {   /*тип входящих props в todolist*/
    title: string,
    tasks: Array<TaskType>, /*сюда передается тип тасок из TaskType.*/
    removeTasks: (id: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addTask: (title: string) => void,
    changeStatus: (taskId:string, isDone: boolean)=>void
    filter: FilterValuesType
}
export const TodoList = (props: PropsType) => {

    const [newTaskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState<null | string>(null);

    const onNewTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    }
    const onNewTaskTitleKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle);
            setTaskTitle('');
        }
    };

    const addTask = () => {
        if (newTaskTitle.trim()!=='') {
            props.addTask(newTaskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Field is required')
        }

    };
    const onAllClickHandler = () => {
        props.changeFilter("all")
    };
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    };
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    };

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTaskTitleChangeHandler}
                       onKeyPress={onNewTaskTitleKeyPressHandler}
                       className={error ? "error" : ''}
                />
                <button onClick={addTask}>+
                </button>
                {error && <div className="errorMessage">{error}</div>}
            </div>
            <ul>
                {/*приходят данные из props*/}
                {props.tasks.map(t => {
                        const onRemoveTasksHandler = () => {
                            props.removeTasks(t.id) /*отправляет id удаляемого эл. в removeTasks*/
                        }
                        const onChangeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked)
                        }

                        return (<li key={t.id} className={t.isDone ? 'isDone' : ''}><input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={onChangeStatusHandler}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveTasksHandler}>X
                            </button>
                        </li>)
                    }
                )
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'activeFilter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'activeFilter' : ''} onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'activeFilter' : ''} onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}