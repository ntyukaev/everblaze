import { createSlice } from "@reduxjs/toolkit/"

const initialState = {
    selectedChart: null
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
        }
    }
})

export const { selectChart, deselectChart } = selectedChartSlice.actions

export default selectedChartSlice.reducer
