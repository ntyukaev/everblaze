import { Layout, Row, Col } from 'antd'
import PageList from './PageList'

const { Footer } = Layout

const BottomMenu = () => {
  return (
    <Footer>
      <Row>
        <Col span={24}>
          <PageList/>
        </Col>
      </Row>
    </Footer>
  )
}

export default BottomMenu
