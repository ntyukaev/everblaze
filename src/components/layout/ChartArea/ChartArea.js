import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from 'styled-components'
import _ from 'lodash'
import { Layout } from 'antd'
import { unselectChart } from "../../../reducers/configureCharts"
import ChartContainer from "./charts/ChartContainer/ChartContainer"

const { Content } = Layout

const ChartAreaContainer = styled.div.attrs(({ width, height }) => ({
  style: {
    width: `${width}px`,
    height: `${height}px`,
    background: 'white'
  }
}))`
    position: relative;
    border: 1px solid black;
  `

const ChartArea = () => {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const charts = useSelector((state) => state.chartConfig.charts)
  const selectedChart = useSelector((state) => state.chartConfig.selectedChart)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [resolution, setResolution] = useState(0)

  useEffect(() => {
    if (selectedChart != null) {
      ref.current.addEventListener('mouseup', unselect)
    }
    else {
      ref.current.removeEventListener('mouseup', unselect)
    }
  }, [selectedChart])

  const unselect = () => {
    ref.current.removeEventListener('mouseup', unselect)
    dispatch(unselectChart())
  }

  useEffect(() => {
    const height = ref.current.parentElement.offsetHeight
    const width = ref.current.parentElement.offsetWidth
    const resolution = width / 4
    setHeight(height)
    setWidth(width)
    setResolution(resolution)
  }, [])

  return (
    <Content style={{
      margin: '0',
      overflow: 'initial',
      width: '100%',
      height: '100%'
    }}>
      <ChartAreaContainer className='chart-area' ref={ref} width={width} height={height} resolution={resolution}>
        {Object.keys(charts).map(key => (
          <ChartContainer
            key={key}
            id={key}
            {...charts[key]}
            resolution={resolution}
            bounds={{ left: 0, top: 0, right: width, bottom: height }}
          />
        ))}
      </ChartAreaContainer>
    </Content>
  )
}


export default ChartArea
