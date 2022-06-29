import { createSlice } from "@reduxjs/toolkit/"

const initialState = {
  importModalVisible: false
}

export const configImportModal = createSlice({
  name: 'importModalConfig',
  initialState,
  reducers: {
    setImportModalVisible: (state, action) => {
      state.importModalVisible = action.payload
    }
  }
})

export const { setImportModalVisible } = configImportModal.actions

export default configImportModal.reducer
