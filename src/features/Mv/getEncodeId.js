const { createSlice } = require("@reduxjs/toolkit");

const mv = createSlice({
    name: "mv",
    initialState: [],
    reducers: {
        getEncodeId: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const { reducer, actions } = mv
export const {getEncodeId} = actions
export default reducer
