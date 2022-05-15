const { createSlice } = require("@reduxjs/toolkit");

const link = createSlice({
    name: "link",
    initialState: [],
    reducers: {
        loadLink: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const { reducer, actions } = link
export const {loadLink} = actions
export default reducer
