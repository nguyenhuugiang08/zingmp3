const { createSlice } = require("@reduxjs/toolkit");

const zingchart = createSlice({
    name: 'zingchart',
    initialState: [],
    reducers: {
        getZingchartApi: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const {reducer, actions} = zingchart
export const {getZingchartApi} = actions
export default reducer