import React from 'react';
import Container from '../styledComponents/container';
import Text from '../styledComponents/text'
import Button from '../styledComponents/button'
import { Row, Col, Space } from 'antd'
import { motion } from 'framer-motion';

export const TitleBar = (props) => {
  return (
    <>
      <Container titlebar bgwhite  as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
        <Container leaveMargin >
          <Row gutter={30}>
            <Col span={24}>
              <Space>
                <Text pointer>Orders ＞</Text>
                <Text underline pointer>Order 32457ABC</Text>
              </Space>
            </Col>
            <Col span={24}>
              <Container space>
                <Row>
                  <Col span={12}>
                    <Text primary bold heading>Order 32457ABC</Text>
                  </Col>
                  <Col span={12}>
                    <Row gutter={30} justify={'end'}>
                      <Col><Button>Back</Button></Col>
                      <Col><Button primary>Approve order</Button></Col>
                    </Row>
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


