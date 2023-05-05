import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";


function App() {
    /*хук useState для перерисовки массива initTasks*/
    let [tasks, setTasks] = useState([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "JAVA", isDone: false}
    ]);

    /*removeTasks принимает id из массива*/
    function removeTasks(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id) /*пропускает все id которые !== той которую надо удалить. Передает новый массив в setTasks для отправки в стейт на перерисовку*/
        setTasks(filteredTasks);
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
