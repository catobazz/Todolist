import React, {ChangeEvent, FC, useState} from 'react';
import {FilterValuesType} from "./App";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import {faDeleteLeft} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeFilter: (nextFilterValue: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodolistTitle: (newTitle: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList: FC<TodoListPropsType> = (props) => {

    const tasksList = (props.tasks.length === 0)
        ? <p>TodoList is empty</p>
        : <ul className={"tasks-list"}>
            {
                props.tasks.map((task) => {
                    const removeTask = () => props.removeTask(task.id, props.todoListId)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(task.id, title, props.todoListId)
                    }
                    return (
                        <li key={task.id} className={"tasks-list-item"}>
                            <div>
                                <Checkbox
                                    size={'small'}
                                    checked={task.isDone}
                                    onChange={changeTaskStatus}
                                />
                                <EditableSpan
                                    changeTitle={changeTaskTitle}
                                    classes={task.isDone ? "task-done" : "task"}
                                    title={task.title}/>
                            </div>
                            {/*<button onClick={removeTask}>x</button>*/}
                            <IconButton
                                size={"small"}
                                onClick={removeTask}>
                                <HighlightOffIcon/>
                            </IconButton>
                        </li>
                    )
                })
            }
        </ul>

    const addTask = (title: string) => props.addTask(title, props.todoListId)
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todoListId)
    }
    const maxTaskTitleLength = 15

    return (
        <div className="todoList">
            <h3 className={"todolist-header"}>
                <EditableSpan title={props.title} classes={''} changeTitle={changeTodolistTitle}/>
                {/*<button onClick={() => props.removeTodoList(props.todoListId)}>x</button>*/}
                <IconButton
                    size={"small"}
                    onClick={() => props.removeTodoList(props.todoListId)}>
                    <HighlightOffIcon/>
                </IconButton>
            </h3>
            <AddItemForm maxTaskTitleLength={maxTaskTitleLength} addItem={addTask}/>

            {tasksList}
            <div className={"buttons-block"}>
                <Button
                    size={'small'}
                    variant={'contained'}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={() => props.changeFilter("all", props.todoListId)}>All
                </Button>
                <Button
                    size={'small'}
                    variant={'contained'}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={() => props.changeFilter("active", props.todoListId)}>Active
                </Button>
                <Button
                    size={'small'}
                    variant={'contained'}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={() => props.changeFilter("completed", props.todoListId)}>Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;