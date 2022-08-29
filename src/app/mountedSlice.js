const { createSlice } = require("@reduxjs/toolkit");

const mv = createSlice({
    name: "mvMounted",
    initialState: [],
    reducers: {
        getMounted: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const { reducer, actions } = mv
export const {getMounted} = actions
export default reducer
