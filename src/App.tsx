import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
    /*хук useState для перерисовки массива initTasks*/
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "JAVA", isDone: false}
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('active') /*фильтр для кнопок отображения тасок*/

    /*для фильтра для удаления тасок----------------------*/

    /*removeTasks принимает id из массива*/
    function removeTasks(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id) /*пропускает все id которые !== той которую надо удалить. Передает новый массив в setTasks для отправки в стейт на перерисовку*/
        setTasks(filteredTasks);
    }

    /*-----------------------------------------------*/

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
            />
            {/*отрисовывает JSX из компоненты todolist (передает в todolist паремтры title и tasks через props)*/}
        </div>
    );
}

export default App;
