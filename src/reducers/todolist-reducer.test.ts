import {v1} from "uuid";
import {TodoListType} from "../App";
import {todolistReducer} from "./todolist-reducer";


test('correct todolist should be removed', ()=>{
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const  startState: Array<TodoListType> = [
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ]
    const  endState = todolistReducer(startState, {type: "REMOVE-TODOLIST", todolistId: todoListId_1})
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId_2)

})

test('correct todolist should be added', ()=>{
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const newTodolistTitle = "New todolist"
    const  startState: Array<TodoListType> = [
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ]
const  endState = todolistReducer(startState, {type: "ADD-TODOLIST", title: newTodolistTitle , todolistId: v1()})
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('title todolist should be changed', ()=>{
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const newTitle = "New title"
    const  startState: Array<TodoListType> = [
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ]
    const  endState = todolistReducer(startState, {type: "CHANGE-TODOLIST-TITLE", title: newTitle , todolistId: todoListId_2})
    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTitle)
})
