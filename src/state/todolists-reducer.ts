import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | setTodolistType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case "SET-TODOLIST": {
            return action.todos.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter:'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]

        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodolistAC = (todos:TodolistType[]) => {
    return {type: 'SET-TODOLIST', todos} as const
}

export type setTodolistType = ReturnType<typeof setTodolistAC>


export const fetchTodolistsThunk = () => {
    return (dispatch:Dispatch) => {
        todolistsAPI.getTodolists()
            .then((response) => dispatch(setTodolistAC(response.data)))
    }
}

export const createTodolistsTC = (title:string) => {
    return (dispatch:Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then((response) =>
                dispatch(addTodolistAC(response.data.data.item)))
    }
}

export const deleteTodolistsTC = (todolistId:string) => {
    return (dispatch:Dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((response) => {
                    if (response.data.resultCode === 0) {
                        dispatch(removeTodolistAC(todolistId))
                    }

                }
            )
    }
}

export const updateTodolistTitleTC = (todolistId:string, title:string) => {
    return (dispatch:Dispatch) => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then((response) => {
                dispatch(changeTodolistTitleAC(todolistId,title))
                }
            )
    }
}
