import React from 'react'
import { Layout } from 'antd'
import { TopMenu, ChartArea, RightMenu, BottomMenu } from './components/layout'
import 'antd/dist/antd.css'

const App = () => {
  return (
    <Layout className='main-wrapper'>
      <TopMenu />
      <Layout hasSider>
        <ChartArea />
        <RightMenu/>
      </Layout>
      <BottomMenu/>
    </Layout>
  );
}

export default App
