import React from 'react'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import Dashboard from './components/Dashboard'

const { Header, Content, Footer, Sider } = Layout

const App = () => {
  return (
    <Layout className='main-wrapper' hasSider>
      <Layout
        className="site-layout"
        style={{
          marginRight: 120,
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
            width: '100%',
            height: '100%'
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
        theme='light'
        width={120}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        
      </Sider>
    </Layout>
  );
}

export default App
