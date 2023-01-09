import React from 'react'
import Container from '../styledComponents/container'
import Text from '../styledComponents/text'
import { Row, Col } from 'antd'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { ShoppingCartOutlined } from '@ant-design/icons'

export const Navbar = (props) => {

  const cartLength = useSelector(state => state.orders.cart.length)

  return (
    <>
      <Container primary as={motion.div} initial={{ minHeight: '1000px' }}
        animate={{ minHeight: '30px' }}
        transition={{ duration: 0.3 }} >
        <Container navbar leaveMargin >
          <Row>
            <Col span={12}>
              <Row gutter={30}>
                <Col>
                  <Text as={motion.div} initial={{ x: 100, fontSize: '300px', y: 100 }} animate={{ x: 0, fontSize: '17px', y: 0 }} transition={{ duration: 0.3 }} white bold>Reeco</Text>
                </Col>
                {['Store', 'Orders', 'Analytics'].map((key, index) => <Col key={key}>
                  <Text as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} white>{key}</Text>
                </Col>)}
              </Row>
            </Col>
            <Col span={12}>
              <Container>
                <Row gutter={30} justify={'end'}>
                  <Col>
                    <Container as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                      <ShoppingCartOutlined />
                      <Text white bold>{cartLength}</Text>
                    </Container>
                  </Col>
                  <Col>
                    <Container as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                      <Text white bold>{`Hello James ▽`}</Text>
                    </Container>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}

