import { createSlice } from "@reduxjs/toolkit/"

const initialState = {
  datasets: ['A', 'B'],
  fields: [
    { dataset: 'A', name: 'field1', index: 0, values: [1, 2, 3, 4, 5, 6, 7], charts: [] },
    { dataset: 'A', name: 'field2', index: 1, values: [1, 2, 3, 4, 5, 6, 7], charts: [] },
    { dataset: 'B', name: 'field1', index: 2, values: [1, 2, 3, 4, 5, 6, 7], charts: [] },
    { dataset: 'B', name: 'field2', index: 3, values: [1, 2, 3, 4, 5, 6, 7], charts: [] }
  ]
}

export const datasetConfigSlice = createSlice({
  name: 'datasetConfig',
  initialState,
  reducers: {
    addDataset: (state, action) => {
      state.datasets.push(action.payload)
    },
    updateField: (state, action) => {
      state.fields[action.payload.index].charts.push({
        chart: action.payload.chart,
        axis: action.payload.axis
      })
    }
  }
})

export const { addDataset, updateField } = datasetConfigSlice.actions

export default datasetConfigSlice.reducer
