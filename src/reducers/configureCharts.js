import { createSlice } from "@reduxjs/toolkit/"
import { v4 as uuidv4 } from 'uuid'

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
      state.charts[action.payload.id] = { type: action.payload.type, fields: {} }
    },
    setChartType: (state, action) => {
      state.charts[action.payload.id].type = action.payload.type
    },
    attachFieldToChart: (state, action) => {
      console.log('attach field to chart')
      const id = uuidv4()
      const { fieldId, axis, chartId } = action.payload
      state.charts[chartId].fields[id] = {
        axis,
        fieldId
      }
    },
    changeFieldAxis: (state, action) => {
      const { fieldId, axis, chartId } = action.payload
      state.charts[chartId].fields[fieldId].axis = axis
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

export const {
  addChart,
  addDataset,
  selectChart,
  setChartType,
  unselectChart,
  changeFieldAxis,
  attachFieldToChart
} = chartConfigSlice.actions

export default chartConfigSlice.reducer
