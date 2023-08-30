import {TodolistType} from "./App";
import styles from "./TodoList.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {SuperCheckbox} from "./components/SuperCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type  TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todolist: TodolistType
}

const TodoListWithRedux = ({todolist}: TodoListPropsType) => {
    const {id, title, filter} = todolist
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch()


    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(id, "all"));
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(id, "active"));
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(id, "completed"));

    if (filter === "active") {
        tasks = tasks.filter(el => !el.isDone)
    }
    if (filter === "completed") {
        tasks = tasks.filter(el => el.isDone)
    }

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
    }
    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(title, id))
    }
    const updateTitleTaskHandler = (taskId: string, updateTitle: string) => {
        // props.updateTitleTask(props.todolistId, taskId, updateTitle)
        dispatch(changeTaskTitleAC(taskId, updateTitle, id))
    }
    const updateTitleTodolistHandler = (updateTitle: string) => {
        // props.updateTitleTodolist(props.todolistId, updateTitle)
        dispatch(changeTodolistTitleAC(id, updateTitle))
    }

    const changeStatusHandler = (taskId: string, isDone: boolean) => {
        // props.changeStatus(props.todolistId, taskId, isDone)
        dispatch(changeTaskStatusAC(taskId, isDone, id))
    }

    const mappedTasks = tasks.map(task => {
            const removeTaskHandler = () => {
                // props.removeTask(props.todolistId, task.id)
                dispatch(removeTaskAC(task.id, id))
            }
            return (
                <li key={task.id} className={task.isDone ? styles.isDone : ''}>

                    <SuperCheckbox isDone={task.isDone} callBack={(isDone) => changeStatusHandler(task.id, isDone)}/>
                    <EditableSpan
                        title={task.title}
                        editableSpanCallBack={(updateTitle) => updateTitleTaskHandler(task.id, updateTitle)}
                    />
                    <IconButton aria-label="delete" onClick={removeTaskHandler}>
                        <DeleteIcon/>
                    </IconButton>
                </li>
            )
        }
    )

    return (
        <div className="todolist">
            <h3>
                <EditableSpan
                    title={title}
                    editableSpanCallBack={updateTitleTodolistHandler}
                />
                <IconButton size={'small'} aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm
                    itemFormCallback={addTaskHandler}
                />
            </div>
            <ul>
                {mappedTasks}
            </ul>
            <div>

                <Button onClick={onAllClickHandler}
                        variant={filter === 'all' ? "contained" : "outlined"}>All</Button>
                <Button onClick={onActiveClickHandler}
                        variant={filter === 'active' ? "contained" : "outlined"}>Active</Button>
                <Button onClick={onCompletedClickHandler}
                        variant={filter === 'completed' ? "contained" : "outlined"}>Completed</Button>
            </div>
        </div>
    );

};

export default TodoListWithRedux;