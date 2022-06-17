import { combineReducers } from "redux"
import configureChart from "./configureChart"

export default combineReducers({ chartConfig: configureChart })
