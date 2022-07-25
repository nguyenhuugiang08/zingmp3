
const { createSlice } = require('@reduxjs/toolkit')

const radio = createSlice({
    name: 'radio',
    initialState: [],
    reducers: {
        getRadio: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const { reducer, actions } = radio
export const {getRadio} = actions
export default reducer