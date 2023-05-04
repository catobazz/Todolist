import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList";


function App() {
    let task1: Array<TaskType> = [ /*прописал тип массива, импортировал тип тасок из TaskType*/
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "JAVA", isDone: false}
    ]
    let task2: Array<TaskType> = [
        {id: 1, title: "Terminafter", isDone: true},
        {id: 2, title: "BBC", isDone: true},
        {id: 3, title: "XXX", isDone: false}
    ]

    return (
        <div className="App">

            <TodoList title="What to learn" tasks={task1}/>
            <TodoList title="Moovies" tasks={task2}/>
            {/*отрисовывает JSX из компоненты todolist (передает в todolist паремтры title и tasks через props)*/}
        </div>
    );
}

export default App;
