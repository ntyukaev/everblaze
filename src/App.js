import React from 'react'
import { Layout, Card } from 'antd'
import {
  AreaChartOutlined,
  PieChartOutlined,
  BarChartOutlined,
  DotChartOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import Dashboard from './components/Dashboard'

const { Header, Content, Footer, Sider } = Layout

const App = () => {
  return (
    <Layout hasSider>
      <Layout
        className="site-layout"
        style={{
          marginRight: 200,
        }}
      >
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: '0',
            overflow: 'initial',
          }}
        >
          <Dashboard />
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Footer
        </Footer>
      </Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Card
          title="Chart Types"
          bordered={false}
          style={{
            width: 300,
          }}
        >
          <AreaChartOutlined />
          <PieChartOutlined />
          <BarChartOutlined />
          <DotChartOutlined />
        </Card>
        <Card
          title="Data Fields"
          bordered={false}
          style={{
            width: 300,
          }}
        >
          Data Fields
        </Card>
      </Sider>
    </Layout>
  );
}

export default App
