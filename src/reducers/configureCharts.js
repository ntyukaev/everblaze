import { createSlice } from "@reduxjs/toolkit/"

const initialState = {
  selectedChart: null,
  charts: []
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
      state.charts.push(action.payload)
    },
    updateChart: (state, action) => {
      state.charts[action.payload.id] = action.payload
    }
  }
})

export const { selectChart, unselectChart, addChart, updateChart } = chartConfigSlice.actions

export default chartConfigSlice.reducer
