import { createSlice } from "@reduxjs/toolkit/"

const initialState = {
  selectedChart: null,
  charts: {},
  datasets: ['A', 'B'],
  fields: {
    '1': { dataset: 'A', name: 'field1', values: [1, 2, 3, 4, 5, 6, 7] },
    '2': { dataset: 'A', name: 'field2', values: [1, 2, 3, 4, 5, 6, 7] },
    '3': { dataset: 'B', name: 'field3', values: [1, 2, 3, 4, 5, 6, 7] },
    '4': { dataset: 'B', name: 'field4', values: [1, 2, 3, 4, 5, 6, 7] }
  }
}

export const chartConfigSlice = createSlice({
  name: 'chartConfig',
  initialState,
  reducers: {
    selectChart: (state, action) => {
      state.selectedChart = action.payload
    },
    unselectChart: (state) => {
      state.selectedChart = null
    },
    addChart: (state, action) => {
      state.charts[action.payload.id] = { type: action.payload.type, fields: [] }
    },
    updateChart: (state, action) => {
      state.charts[action.payload.id] = action.payload
    },
    attachFieldToChart: (state, action) => {
      state.charts[action.payload.chartId].fields.push([action.payload.fieldId, action.payload.axis])
    }
  }
})

export const { selectChart, unselectChart, addChart, updateChart, attachFieldToChart } = chartConfigSlice.actions

export default chartConfigSlice.reducer
