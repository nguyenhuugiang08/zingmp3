const { createSlice } = require("@reduxjs/toolkit");

const playlist = createSlice({
    name: 'playlist',
    initialState: [],
    reducers: {
        getPlaylistApi: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const {reducer, actions} = playlist
export const {getPlaylistApi} = actions
export default reducer