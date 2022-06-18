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
        deselectChart: (state) => {
            state.selectedChart = null
        },
        addChart: (state, action) => {
            state.charts.push(action.payload)
        }
    }
})

export const { selectChart, deselectChart, addChart } = selectedChartSlice.actions


export default selectedChartSlice.reducer
