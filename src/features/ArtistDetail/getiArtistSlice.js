const { createSlice } = require("@reduxjs/toolkit");

const getArtist = createSlice({
    name: "getArtist",
    initialState: [],
    reducers: {
        getInfoArtistApi: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const { reducer, actions } = getArtist
export const {getInfoArtistApi} = actions
export default reducer
