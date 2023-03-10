import { combineReducers } from '@reduxjs/toolkit'
import pickerReducer from './pickerSlice'

const rootReducer = combineReducers({
    picker: pickerReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer