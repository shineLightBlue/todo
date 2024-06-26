import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
    name: 'todos',
    initialState: [
    ],
    reducers: {
        todoAdded(state, action) {
            const id  = state.length
            state.push({
                id: id + 1,
                text: action.payload.text,
                completed: false
            })
        },
        todoToggled(state, action) {
            const todo = state.find(todo => todo.id === action.payload)
            todo.completed = !todo.completed
        },
        todoChanged(state, action) {
            const todo = state.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.text = action.payload.text
            }
        },
        todoRemoved(state, action) {
            return state.filter(todo => todo.id !== action.payload);
        }
    }
})

export const { todoAdded, todoToggled, todoChanged,todoRemoved } = todosSlice.actions
export default todosSlice.reducer