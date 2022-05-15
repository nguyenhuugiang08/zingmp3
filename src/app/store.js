import { configureStore } from '@reduxjs/toolkit'
import top100Reducer from 'features/top100/top100Slice'
import linkReducer from "features/linkSlice"

const rootReducer = {
    top100: top100Reducer,
    link: linkReducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store