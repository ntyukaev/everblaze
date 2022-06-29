import { createSlice } from "@reduxjs/toolkit/"

const initialState = {
  selectedChart: null,
  charts: {},
  datasets: [],
  fields: {}
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
    setChartType: (state, action) => {
      state.charts[action.payload.id].type = action.payload.type
    },
    attachFieldToChart: (state, action) => {
      state.charts[action.payload.chartId].fields.push([action.payload.fieldId, action.payload.axis])
    },
    addDataset: (state, action) => {
      state.datasets.push(action.payload.dataset)
      state.fields = {
        ...state.fields,
        ...action.payload.fields
      }
    }
  }
})

export const { selectChart, unselectChart, addChart, setChartType, attachFieldToChart, addDataset } = chartConfigSlice.actions

export default chartConfigSlice.reducer
