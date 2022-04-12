import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistAC,
    TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {v1} from "uuid";

let todolistId1: string
let todolistId2: string

let startState: Array<TodolistDomainType> = []

beforeEach(() => {
     todolistId1 = v1()
    todolistId2 = v1()

     startState = [
         {id: todolistId1, title:'What to learn', order: 0, addedDate: '', filter: 'all'},
         {id: todolistId2, title:'What to buy', order: 0, addedDate: '', filter: 'all'}
     ]
})


test('correnct todoList should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId2))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId1)
    })

test('todolist should be added', () => {
    const newTodolist:TodolistDomainType = {
        id: 'newTODO',
        title: 'new Title',
        addedDate: '',
        order: 0,
        filter: 'all'
    }
    const endState = todolistsReducer(startState, addTodolistAC(newTodolist))

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe('newTODO')

})


test('Should be Changed Todolist Title', () => {

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId1,'newTitle'))
    expect(endState[0].title).toBe('newTitle')

})

test('Should be Changed Todolist Title', () => {

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, 'active'))

    expect(endState[1].filter).toBe('active')
    expect(endState[0].filter).toBe('all')
    
})



test('Should be Todolist Setted in Array', () => {
    const endState = todolistsReducer([], setTodolistAC(startState))
    expect(endState.length).toBe(2)

})