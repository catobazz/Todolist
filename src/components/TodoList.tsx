import React from "react";

export type TaskType = { /*тип тасок в PropsType*/ /*экспортируем тип тасок в task1 и task2 (в App)*/
    id: number,
    title: string,
    isDone: boolean
}
type PropsType = {   /*тип входящих props в todolist*/
    title: string,
    tasks: Array<TaskType> /*сюда передается тип тасок из TaskType.*/
}
export const TodoList = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {/*приходят данные из props*/}
                {props.tasks.map((t)=>{
                    return(
                        <li key={t.id}><input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                            <button onClick={ ()=> {} }>X</button>
                        </li>

                    )
                })}

            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}