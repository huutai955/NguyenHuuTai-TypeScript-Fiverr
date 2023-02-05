import { configureStore } from '@reduxjs/toolkit'
import commentReducer from './reducers/commentReducer'
import jobReducer from './reducers/jobReducer'
import testReducer from './reducers/testReducer'
import typeOfJobReducer from './reducers/typeOfJobReducer'
import userReducer from './reducers/userReducer'
// ...
const store = configureStore({
  reducer: {
    testReducer: testReducer,
    jobReducer: jobReducer,
    commentReducer: commentReducer,
    userReducer:userReducer,
    typeOfJobReducer: typeOfJobReducer
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store