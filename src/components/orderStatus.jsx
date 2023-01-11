import React from 'react'
import { Row, Col, Space } from 'antd'
import Text from '../styledComponents/text'
import { CheckOutlined, CloseOutlined, PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { approveItem, updateCartAfterEdit, updateMissingItem } from '../slice/orderSlice'
import Button from '../styledComponents/button'
import Container from '../styledComponents/container'
import Tag from '../styledComponents/tag'
import { Modal } from 'antd';
import AppleImage from '../assets/Apple.png'
import AvacadoImage from '../assets/Avocado.jpg'
import Image from '../styledComponents/img'
import Input from '../styledComponents/input'


const OrderStatus = ({ item }) => {
  const [showModal, setShowModal] = React.useState(false)
  const [showEditModal, setShowEditModal] = React.useState(false)
  const [reasons, setReasons] = React.useState(item.reasons || [])
  const [price, setPrice] = React.useState(item.price || 0)
  const [quantity, setQuantity] = React.useState(item.quantity || 0)
  const dispatch = useDispatch()

  const priceRef = React.useRef(null)
  const quantityRef = React.useRef(null)

  const { approved, missing, urgent, name } = item

  const handleApproveItem = () => {
    dispatch(approveItem({ item, approved: !approved }))
  }

  const handleMissingItem = (urgent) => {
    dispatch(updateMissingItem({ item, missing: !missing, urgent: urgent }))
    setShowModal(false)
  }

  const handleSelectReason = (reason) => {
    if (reasons.includes(reason)) {
      setReasons(reasons.filter(r => r !== reason))
      return
    }
    setReasons([...reasons, reason])
  }

  const handleSendOrder = () => {
    dispatch(updateCartAfterEdit({ item, price, quantity, reasons }))
    setShowEditModal(false);
  }

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setReasons(item.reasons || []);
    setPrice(item.price)
    setQuantity(item.quantity)
  }

  const renderReasonsTag = () => {
    let priceChange = false, quantityChange = false, others = false, missingReason = false;
    (reasons || []).forEach(eachReason => {
      // ['Missing Product', 'Quality is not the same', 'Price is not the same', 'Other']
      if (eachReason === 'Missing Product') (missingReason = true)
      if (eachReason.includes('Quality')) (quantityChange = true)
      if (eachReason.includes('Price')) (priceChange = true)
      if (eachReason.includes('Other')) (others = true)
    })
    if ((missing || missingReason) && !urgent) {
      return <Tag primary dummy bgColor='orange'>
        <Text small white dummy>Missing</Text>
      </Tag>
    }
    if ((missing || missingReason) && urgent) {
      return <Tag primary dummy bgColor="red">
        <Text small white dummy>Missing - Urgent</Text>
      </Tag>
    }
    if (others) {
      return <Tag primary dummy bgColor="green">
        <Text small white dummy>Others</Text>
      </Tag>
    }
    if (priceChange && !quantityChange) {
      return <Tag primary dummy bgColor="green">
        <Text small white dummy>Price updated</Text>
      </Tag>
    }
    if (!priceChange && quantityChange) {
      return <Tag primary dummy bgColor="green">
        <Text small white dummy>Quantity updated</Text>
      </Tag>
    }
    if (priceChange && quantityChange) {
      return <Tag primary dummy bgColor="green">
        <Text small white dummy>Quantity and price updated</Text>
      </Tag>
    }
    if (!others && !priceChange && !quantityChange && approved) {
      return <Tag primary dummy bgColor="green">
        <Text small white dummy>Approved</Text>
      </Tag>
    }
  }

  return (
    <Container style={{ paddingLeft: '10px', paddingRight: '10px' }}>
      <Row gutter={10}>
        <Col span={16}>
          {
            renderReasonsTag()
          }
        </Col>
        <Col span={8}>
          <Row justify={'end'}>
            <Space size={15}>
              <Text small primary green={approved} pointer>
                <CheckOutlined onClick={handleApproveItem} />
              </Text>
              <Text small primary pointer orange={missing} red={(missing && urgent)}>
                <CloseOutlined onClick={() => setShowModal(true)} />
              </Text>
              <Text small primary pointer onClick={() => setShowEditModal(true)}>Edit</Text>
            </Space>
          </Row>
        </Col>
      </Row>
      <Modal
        open={showModal}
        title="Missing product"
        onOk={() => { }}
        onCancel={() => { setShowModal(false) }}
        footer={[
          <Text bold space pointer onClick={() => handleMissingItem(false)} border="0px">No</Text>,
          <Text bold space pointer onClick={() => handleMissingItem(true)} border="0px">Yes</Text>
        ]}
      >
        <Text >is "</Text>
        <Text bold >{item.name}</Text>
        <Text >" urgent?</Text>
      </Modal>
      <Modal
        open={showEditModal}
        title={<Text ellipsis primary bold>{name}</Text>}
        onOk={() => { }}
        onCancel={() => { handleEditModalClose() }}
        footer={[
          <Text bold space pointer onClick={handleEditModalClose} border="0px">Cancel</Text>,
          <Button primary bold space pointer onClick={handleSendOrder} border="0px">Send</Button>
        ]}
      >
        <Row gutter={16}>
          <Col span={6}>
            <Image src={item?.category === 'fruit' ? AppleImage : AvacadoImage} height='120' width='100' />
          </Col>
          <Col span={18}>
            <Row>
              <Col span={24}>
                <Container space>
                  <Row>
                    <Col span={10}>
                      <Text primary>Price ($)</Text>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={12}>
                      <Input type={'number'} min={0} forEdit value={price} ref={priceRef} onChange={(e) => setPrice(e.target.value)} />
                      <Text> / {item.unit}</Text>
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col span={24}>
                <Container space>
                  <Row>
                    <Col span={10}>
                      <Text primary>Quantity</Text>
                    </Col>
                    <Col span={2}>
                      <MinusCircleTwoTone className={'input-handler-icon'} twoToneColor="#52c41a" onClick={() => { setQuantity(parseInt(quantity) - 1) }} />
                    </Col>
                    <Col span={8}>
                      <Input type={'number'} min={0} forEdit value={quantity} ref={quantityRef} onChange={e => setQuantity(e.target.value)} />
                      &nbsp;
                      <PlusCircleTwoTone className={'input-handler-icon'} twoToneColor="#52c41a" onClick={() => { setQuantity(parseInt(quantity) + 1) }} />
                    </Col>
                    <Col span={4}>
                      <Text>*{item.unit}</Text>
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col span={24}>
                <Container space>
                  <Row>
                    <Col span={10}>
                      <Text primary>Total</Text>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={12}>
                      {(price * quantity).toFixed(3)}
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Text bold primary>Choose reason</Text><Text small> (Optional)</Text>
          </Col>
          <Col span={24}>
            <>
              {['Missing Product', 'Quality is not the same', 'Price is not the same', 'Other'].map(reason => {
                return <Tag key={reason} selectionTag selected={(reasons || []).includes(reason)} onClick={() => handleSelectReason(reason)}>{reason}</Tag>
              })}
            </>
          </Col>
        </Row>
      </Modal>
    </Container>
  )
}

export default OrderStatus