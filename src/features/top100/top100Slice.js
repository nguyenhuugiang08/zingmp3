import { createSlice } from '@reduxjs/toolkit'

const top100 = createSlice({
    name: 'top100',
    initialState: [],
    reducers: {
        loadCurrentSong: (state, action) => {
            state.push(action.payload)
        }
    }
})

const { reducer, actions } = top100
export const { loadCurrentSong } = actions
export default reducer