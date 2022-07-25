const { createSlice } = require("@reduxjs/toolkit");

const mv = createSlice({
    name: "mv",
    initialState: [],
    reducers: {
        getListMv: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const { reducer, actions } = mv
export const {getListMv} = actions
export default reducer
