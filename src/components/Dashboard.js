import { useState } from "react"
import styled from 'styled-components'
import _ from 'lodash'
import './Dashboard.css'
import ChartContainer from './ChartContainer'

const createGrid = (width, height, resolution) => {
  const svg = document.createElement('svg')
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  const rect = document.createElement('rect')
  rect.setAttribute('x', 0)
  rect.setAttribute('y', 0)
  rect.setAttribute('width', width)
  rect.setAttribute('height', height)
  rect.setAttribute('fill', 'white')
  svg.append(rect)

  /* Vertical */
  _.range(1, width / resolution).forEach((e) => {
    const line = document.createElement('line')
    line.classList.add('vertical')
    line.setAttribute('x1', e * resolution)
    line.setAttribute('x2', e * resolution)
    line.setAttribute('y1', 0)
    line.setAttribute('y2', height)
    line.setAttribute('stroke', 'black')
    line.setAttribute('stroke-width', '1px')
    svg.append(line)
  })

  /* Horizontal */
  _.range(1, height / resolution).forEach((e) => {
    const line = document.createElement('line')
    line.classList.add('horizontal')
    line.setAttribute('x1', 0)
    line.setAttribute('x2', width)
    line.setAttribute('y1', e * resolution)
    line.setAttribute('y2', e * resolution)
    line.setAttribute('stroke', 'black')
    line.setAttribute('stroke-width', '1px')
    svg.append(line)
  })

  return btoa(svg.outerHTML)
}

const DashboardContainer = styled.div.attrs(({ width, height, resolution }) => ({
  style: {
    width: `${width}px`,
    height: `${height}px`,
    backgroundImage: `url('data:image/svg+xml;base64,${createGrid(width, height, resolution)}')`
  }
}))`
    position: relative;
    border: 1px solid black;
  `

const Dashboard = () => {
  const [width, setWidth] = useState(870)
  const [height, setHeight] = useState(500)
  const [resolution, setResolution] = useState(20)
  return (
    <DashboardContainer width={width} height={height} resolution={resolution}>
      <ChartContainer
        grid={{ x: resolution, y: resolution }}
        bounds={{ left: 0, top: 0, right: width, bottom: height }}
      />
      <ChartContainer
        grid={{ x: resolution, y: resolution }}
        bounds={{ left: 0, top: 0, right: width, bottom: height }}
      />
    </DashboardContainer>
  )
}


export default Dashboard
