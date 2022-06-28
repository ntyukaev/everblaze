import { createSlice } from "@reduxjs/toolkit/"

const initialState = {
  counter: 1,
  currentPage: 1
}

export const pageConfigSlice = createSlice({
  name: 'pageConfig',
  initialState,
  reducers: {
    addPage: (state) => {
      state.counter += 1
      state.currentPage = state.counter
    },
    selectPage: (state, action) => {
      state.currentPage = action.payload
    }
  }
})

export const { addPage, selectPage } = pageConfigSlice.actions

export default pageConfigSlice.reducer
