import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../App";

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
    addTask: (title: string) => void
}
export const TodoList = (props: PropsType) => {

    const [newTaskTitle, setTaskTitle] = useState('');

    const onNewTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    }
    const onNewTaskTitleKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle);
            setTaskTitle('');
        }
    };

    const addTask = () => {
        props.addTask(newTaskTitle)
        setTaskTitle('')
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
                />
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>
                {/*приходят данные из props*/}
                {props.tasks.map(t => {
                        const onRemoveTasksHandler = () => {
                            props.removeTasks(t.id) /*отправляет id удаляемого эл. в removeTasks*/
                        }
                        return (<li key={t.id}><input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveTasksHandler}>X
                            </button>
                        </li>)
                    }
                )
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All
                </button>
                <button onClick={onActiveClickHandler}>Active
                </button>
                <button onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}