import React from 'react'
import { Layout } from 'antd'
import { TopMenu, Canvas, RightMenu, BottomMenu } from './components/layout'
import 'antd/dist/antd.css'

const App = () => {
  return (
    <Layout className='main-wrapper' hasSider>
      <Layout className="site-layout" style={{ marginRight: 120 }} >
        <TopMenu/>
        <Canvas/>
        <BottomMenu/>
      </Layout>
      <RightMenu/>
    </Layout>
  );
}

export default App
