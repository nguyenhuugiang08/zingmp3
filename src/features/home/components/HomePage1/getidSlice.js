const { createSlice } = require("@reduxjs/toolkit");

const id = createSlice({
    name: 'id',
    initialState: [],
    reducers: {
        getId: (state, action) => {
            state.push(action.payload)
        }
    }
})
export const {reducer, actions} = id
export const {getId} = actions
export default reducer