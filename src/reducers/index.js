import { combineReducers } from "redux"
import configureCharts from "./configureCharts"

export default combineReducers({ chartConfig: configureCharts })
