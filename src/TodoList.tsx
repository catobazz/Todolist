import {filterValuesType} from "./App";
import {ChangeEvent} from "react";
import styles from "./TodoList.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    updateTitleTask: (todolistId: string, taskId: string, updateTitle:string)=>void
}

const TodoList = (props: TodoListPropsType) => {

    const removeTodolistHandler = () => props.removeTodolist(props.todolistId)

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");
    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }
const updateTitleTaskHandler = (taskId: string ,updateTitle: string)=>{
        props.updateTitleTask(props.todolistId, taskId, updateTitle)
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
                    <EditableSpan
                        title={task.title}
                    editableSpanCallBack={()=>updateTitleTaskHandler(task.id)}
                    />
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
                <AddItemForm
                    itemFormCallback={addTaskHandler}
                />
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