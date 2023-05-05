import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList";


function App() {
    let tasks: Array<TaskType> = [ /*прописал тип массива, импортировал тип тасок из TaskType*/
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "JAVA", isDone: false}
    ]

    /*removeTasks принимает id из массива tasks*/
    function removeTasks(id: number) {
        tasks = tasks.filter(t => t.id !== id) /*пропускает все id которые !== той которую надо удалить. Перезаписывает массив tasks*/
    }


    return (
        <div className="App">

            <TodoList title="What to learn"
                      tasks={tasks}
                      removeTasks={removeTasks}
            />
            {/*отрисовывает JSX из компоненты todolist (передает в todolist паремтры title и tasks через props)*/}
        </div>
    );
}

export default App;
