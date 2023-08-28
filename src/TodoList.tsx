import {filterValuesType} from "./App";
import styles from "./TodoList.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {SuperCheckbox} from "./components/SuperCheckbox";

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
    updateTitleTask: (todolistId: string, taskId: string, updateTitle: string) => void
    updateTitleTodolist: (todolistId: string, updateTitle: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const removeTodolistHandler = () => props.removeTodolist(props.todolistId)

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");
    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }
    const updateTitleTaskHandler = (taskId: string, updateTitle: string) => {
        props.updateTitleTask(props.todolistId, taskId, updateTitle)
    }
    const updateTitleTodolistHandler = (updateTitle: string) => {
        props.updateTitleTodolist(props.todolistId, updateTitle)
    }

    const changeStatusHandler = (taskId: string, isDone: boolean) => {
        props.changeStatus(props.todolistId, taskId, isDone)
    }

    const mappedTasks = props.tasks.map(task => {
            const removeTaskHandler = () => {
                props.removeTask(props.todolistId, task.id)
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
                    title={props.title}
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
                        variant={props.filter === 'all' ? "contained" : "outlined"}>All</Button>
                <Button onClick={onActiveClickHandler}
                        variant={props.filter === 'active' ? "contained" : "outlined"}>Active</Button>
                <Button onClick={onCompletedClickHandler}
                        variant={props.filter === 'completed' ? "contained" : "outlined"}>Completed</Button>
            </div>
        </div>
    );

};

export default TodoList;