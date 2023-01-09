import React, { useEffect, useState } from 'react'
import Container from '../styledComponents/container'
import Text from '../styledComponents/text'
import { Space, Divider, Row, Col } from 'antd'
import { fetchOrderSummary } from '../utils/fetchOrderSummary'
import { useSelector } from 'react-redux'
import { RadiusBottomleftOutlined, PicLeftOutlined, FileImageOutlined, FundOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import { getPriceWithOffer } from '../utils/getPriceWithOffer'
import { motion } from 'framer-motion'


export const OrderSummary = (props) => {

  const cart = useSelector(state => state.orders.cart)
  const supplier = useSelector(state => state.orders.supplier)
  const shippingDate = useSelector(state => state.orders.shippingDate)
  const department = useSelector(state => state.orders.department)
  const status = useSelector(state => state.orders.status)

  const [total, setTotal] = useState(0)

  useEffect(() => {
    let sum = 0
    cart.forEach(item => {
      sum += (getPriceWithOffer(item.price, item.offer) * item.quantity)
    })
    setTotal(`$${sum.toFixed(2)}`)
  }, [cart])

  return (
    <Container leaveMargin paddingTop as={motion.div} initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.35 }}>
      <Container border bgwhite>
        <Container space leaveMargin={'30px'} >
          <Row gutter={10}>
            <Col span={4}>
              <Container as={motion.div} initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.40 }}>
                <Col>
                  <Text small>Supplier</Text>
                </Col>
                <Col>
                  <Text bold primary>{supplier}</Text>
                </Col>
              </Container>
            </Col>
            <Col span={4}>
              <Container as={motion.div} initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}><Col>
                  <Text small>Shipping date</Text>
                </Col>
                <Col>
                  <Text bold primary>{shippingDate}</Text>
                </Col>
              </Container>
            </Col>
            <Col span={4}>
              <Container as={motion.div} initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.50 }}>
                <Col>
                  <Text small>Total</Text>
                </Col>
                <Col>
                  <Text bold primary>{total}</Text>
                </Col>
              </Container>
            </Col>
            <Col span={4}>
              <Container as={motion.div} initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}>
                <Col>
                  <Text small>Category</Text>
                </Col>
                <Col>
                  <Space>
                    <Text bold primary>
                      <RadiusBottomleftOutlined />
                    </Text>
                    <Text bold primary>
                      <PicLeftOutlined />
                    </Text>
                    <Text bold primary>
                      <FileImageOutlined />
                    </Text>
                    <Text bold primary>
                      <FundOutlined />
                    </Text>
                    <Text bold primary>
                      <FullscreenExitOutlined />
                    </Text>
                  </Space>
                </Col>
              </Container>
            </Col>
            <Col span={4}>
              <Container as={motion.div} initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.50 }}>
                <Col>
                  <Text small>Department</Text>
                </Col>
                <Col>
                  <Text bold primary>{department}</Text>
                </Col>
              </Container>
            </Col>
            <Col span={4}>
              <Container as={motion.div} initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}>
                <Col>
                  <Text small>Status</Text>
                </Col>
                <Col>
                  <Text bold primary>{status}</Text>
                </Col>
              </Container>
            </Col>
          </Row>
        </Container>
      </Container>
    </Container>
  )
} 