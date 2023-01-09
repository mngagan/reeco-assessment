import React, { useEffect, useState } from 'react'
import Container from '../styledComponents/container'
import { Row, Col } from 'antd'
import Input from '../styledComponents/input'
import Button from '../styledComponents/button'
import Text from '../styledComponents/text'
import { SearchOutlined, PrinterOutlined } from '@ant-design/icons'
import Table from '../styledComponents/table'
import TR from '../styledComponents/tr'
import TD from '../styledComponents/td'
import { fetchOrderDetails } from '../utils/fetchOrderDetails'
import { useSelector, useDispatch } from 'react-redux'
import { updateLoadingStatus, updateDataFetchedFor, updateFetchedOrderDetails } from '../slice/orderSlice'
import OrderStatus from './orderStatus'
import { getPriceWithOffer } from '../utils/getPriceWithOffer'
import AppleImage from '../assets/Apple.png'
import AvacadoImage from '../assets/Avocado.jpg'
import Image from '../styledComponents/img'
import { motion } from 'framer-motion'



export const OrderDetails = (props) => {
  const dataFetchedFor = useSelector(state => state.orders.dataFetchedFor)
  const loadingStatus = useSelector(state => state.orders.loadingStatus)
  const unfilteredCart = useSelector(state => state.orders.cart)
  const [searchText, setSearchText] = useState('')
  const dispatch = useDispatch()
  const [cart, setCart] = useState([])

  useEffect(() => {
    if (!searchText.length) {
      setCart(unfilteredCart)
      return
    }
    setCart(unfilteredCart.filter(item => {
      return item.name.includes(searchText) || item.brand.includes(searchText)
    }))
  }, [unfilteredCart, searchText])

  useEffect(() => {
    async function fetchData() {
      dispatch(updateLoadingStatus({ type: 'orderDetails', value: true }))
      const response = await fetchOrderDetails()
      dispatch(updateLoadingStatus({ type: 'orderDetails', value: false }))
      dispatch(updateDataFetchedFor({ type: 'orderDetails', value: true }))
      dispatch(updateFetchedOrderDetails(response))
    }
    !loadingStatus.OrderDetails && !dataFetchedFor.OrderDetails && fetchData(); //fetching this info only once
  }, [])

  return <>
    <Container leaveMargin paddingTop as={motion.div} initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}>
      <Container border bgwhite>
        <Container space leaveMargin="30px" white>
          <Row gutter={30}>
            <Col span={12}>
              <Container border borderRadius="20px" width="fit-content" as={motion.div} initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}>
                <Container >
                  <Input value={searchText} onChange={e => setSearchText(e.target.value)} placeholder='Search...' width="200px" padLeft />
                  <SearchOutlined className='search-icon' />
                </Container>
              </Container>
            </Col>
            <Col span={12}>
              <Container as={motion.div} initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}>
                <Row gutter={30} justify='end'>
                  <Col><Button>Add item</Button></Col>
                  <Col>
                    <Text heading green pointer>
                      <PrinterOutlined />
                    </Text>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col span={24}>
              <Container space as={motion.div} initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}>
                <Table>
                  <thead>
                    <TR>
                      <TD borderTop borderBottom borderLeft radius='top-left' width={'5%'}>
                      </TD>
                      <TD space='2px' width={'30%'} borderTop borderBottom>
                        <Text >Product name</Text>
                      </TD>
                      <TD width={'10%'} borderTop borderBottom>
                        <Text >Brand</Text>
                      </TD>
                      <TD width={'10%'} borderTop borderBottom>
                        <Text >Price</Text>
                      </TD>
                      <TD width={'10%'} borderTop borderBottom>
                        <Text >Quantity</Text>
                      </TD>
                      <TD width={'10%'} borderTop borderBottom>
                        <Text >Total</Text>
                      </TD>
                      <TD width={'25%'} borderTop borderBottom radius='top-right'>
                        <Text >Status</Text>
                      </TD>
                    </TR>
                  </thead>
                  <tbody >
                    {(cart || []).map(item => <TR key={item.uuid}>
                      <TD width={'5%'} borderBottom>
                        <Image src={item?.category === 'fruit' ? AppleImage : AvacadoImage} height='50' width='50' />
                      </TD>
                      <TD space width={'30%'} borderBottom >
                        <Text primary>{item.name}</Text>
                      </TD>
                      <TD width={'10%'} borderBottom>
                        <Text primary>{item.brand}</Text>
                      </TD>
                      <TD width={'10%'} borderBottom>
                        <Text primary>{`$${item.price}/${item.unit}`}</Text>
                        <div>
                          {(item.price !== item.originalPrice) && <Text strike small >{`$${item.originalPrice}`}</Text>}
                        </div>
                      </TD>
                      <TD width={'10%'} borderBottom>
                        <Text primary bold>{item.quantity}</Text> * <Text primary>{item.unit}</Text>
                        <div>
                          {(item.quantity !== item.originalQuantity) && <Text strike small>{`${item.originalQuantity}`}</Text>}
                        </div>
                      </TD>
                      <TD width={'10%'} borderBottom>
                        <Text primary>{`$${(item.price * item.quantity).toFixed(2)}`}</Text>
                        {((item.price * item.quantity) !== (item.originalPrice * item.originalQuantity)) && <div>
                          {<Text strike small>{`$${(item.originalPrice * item.originalQuantity).toFixed(2)}`}</Text>}
                        </div>}
                      </TD>
                      <TD width={'25%'} borderBottom background="#f0f0f0">
                        <OrderStatus item={item} />
                      </TD>
                    </TR>)}
                  </tbody>
                </Table>
              </Container>
            </Col>
          </Row>

        </Container>
      </Container>
    </Container>
  </>
}