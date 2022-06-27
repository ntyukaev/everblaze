import { Layout, Row, Col } from 'antd'
import './TopMenu.css'

const { Header } = Layout

const TopMenu = () => {
  return (
    <Header
      className='top-menu'
      style={{
        padding: 0,
      }}
    >
      <Row>
        <Col span={6}>Logo</Col>
        <Col span={6}>Import Data</Col>
        <Col span={6}>Other Menu</Col>
        <Col span={6}>Login</Col>
      </Row>
    </Header>
  )
}

export default TopMenu
