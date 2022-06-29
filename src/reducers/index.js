import { combineReducers } from "redux"
import configureCharts from "./configureCharts"
import configurePages from "./configurePages"
import configureImportModal from "./configureImportModal"

export default combineReducers({
  chartConfig: configureCharts,
  pageConfig: configurePages,
  importModalConfig: configureImportModal
})
