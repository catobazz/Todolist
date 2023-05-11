import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
    /*хук useState для перерисовки массива initTasks*/
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "JAVA", isDone: false}
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('active') /*фильтр для кнопок отображения тасок*/

    /*для фильтра для удаления тасок----------------------*/

    /*removeTasks принимает id из массива*/
    function removeTasks(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id) /*пропускает все id которые !== той которую надо удалить. Передает новый массив в setTasks для отправки в стейт на перерисовку*/
        setTasks(filteredTasks);
    }

    /*-----------------------------------------------*/
    function addTask() {
        let newTask = {id: v1(), title: "NEW TASK", isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    /*для фильтра отображения тасок------------------*/
    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodolist = tasks; /*сюда пришел массив из useState*/
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    /*-----------------------------------------------*/

    return (
        <div className="App">

            <TodoList title="What to learn"
                      tasks={tasksForTodolist}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
            {/*отрисовывает JSX из компоненты todolist (передает в todolist паремтры title и tasks через props)*/}
        </div>
    );
}

export default App;
