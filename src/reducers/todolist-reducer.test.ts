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
