import { combineReducers } from "redux"
import configureCharts from "./configureCharts"
import configurePages from "./configurePages"

export default combineReducers({ chartConfig: configureCharts, pageConfig: configurePages })
