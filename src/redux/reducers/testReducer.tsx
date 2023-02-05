import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    number: 1
}

const testReducer = createSlice({
  name: 'testReducer',
  initialState,
  reducers: {
    setNumber: (state, action) => {
       state.number = action.payload
    }   
  }
});

export const {setNumber} = testReducer.actions

export default testReducer.reducer