import { configureStore } from '@reduxjs/toolkit'
import top100Reducer from 'features/top100/top100Slice'

const rootReducer = {
    top100: top100Reducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store