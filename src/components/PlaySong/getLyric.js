const { createSlice } = require("@reduxjs/toolkit");

const lyric = createSlice({
    name: "link",
    initialState: [],
    reducers: {
        getLyricApi: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const { reducer, actions } = lyric
export const {getLyricApi} = actions
export default reducer
