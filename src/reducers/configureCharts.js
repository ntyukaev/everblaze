import { createSlice } from "@reduxjs/toolkit/"

const initialState = {
  selectedChart: null,
  charts: []
}

export const selectedChartSlice = createSlice({
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

export const { selectChart, unselectChart, addChart, updateChart } = selectedChartSlice.actions


export default selectedChartSlice.reducer
