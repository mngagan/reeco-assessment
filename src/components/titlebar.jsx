import { LoadingOutlined } from '@ant-design/icons';
import { Col, Row, Space } from 'antd';
import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { approveOrder } from '../slice/orderSlice';
import Button from '../styledComponents/button';
import Container from '../styledComponents/container';
import Text from '../styledComponents/text';

export const TitleBar = (props) => {

  const [isLoading, setIsLoading] = React.useState(false)
  const isOrderApproved = useSelector(state => state.orders.isOrderApproved)
  const isOrdersLoading = useSelector(state => state.orders.loadingStatus.orderDetails)
  const dispatch = useDispatch()

  const handleApproveOrder = () => {
    setIsLoading(true)
    setTimeout(() => {
      dispatch(approveOrder())
      setIsLoading(false)
    }, 1000);
  }

  return (
    <>
      <Container titlebar bgwhite as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} ref={props.titlebarRef}>
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
                    {!!!isOrdersLoading && <Row gutter={30} justify={'end'}>
                      <Col>
                        <Button>Back</Button>
                      </Col>
                      <Col>
                        {!!!isOrderApproved && <Button primary onClick={handleApproveOrder}>
                          {!!isLoading ? <Container>Approving order <LoadingOutlined /></Container> : 'Approve order'}
                        </Button>}
                      </Col>
                    </Row>}
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


