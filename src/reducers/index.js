import { combineReducers } from "redux"
import configureCharts from "./configureCharts"
import configureDatasets from "./configureDatasets"

export default combineReducers({ chartConfig: configureCharts, datasetConfig: configureDatasets })
