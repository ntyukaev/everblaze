import React from 'react'
import { Layout } from 'antd'
import { TopMenu, ChartArea, RightMenu, BottomMenu } from './components/layout'
import 'antd/dist/antd.css'

const App = () => {
  return (
    <Layout className='main-wrapper' hasSider>
      <Layout className="site-layout" style={{ marginRight: 120 }} >
        <TopMenu/>
        <ChartArea/>
        <BottomMenu/>
      </Layout>
      <RightMenu/>
    </Layout>
  );
}

export default App
