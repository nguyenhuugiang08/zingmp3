const { createSlice } = require("@reduxjs/toolkit");

const getDataHome = createSlice({
    name: "getHome",
    initialState: [],
    reducers: {
        getHomeApi: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const { reducer, actions } = getDataHome
export const {getHomeApi} = actions
export default reducer
