import React from "react";
import { Col, Modal, Row, Space } from 'antd'
import Text from "../styledComponents/text";
import Button from "../styledComponents/button";
import Container from "../styledComponents/container";
import SearchBar from "./searchBar";
import searchProductImage from '../assets/searchProducts.png'
import Image from "../styledComponents/img";
import { getCatalog } from "../mockData";
import { useDispatch } from "react-redux";
import { addProductsToCart, updateLoadingStatus } from "../slice/orderSlice";
import Table from "../styledComponents/table";
import TR from "../styledComponents/tr";
import TD from "../styledComponents/td";
import AppleImage from '../assets/Apple.png'
import AvacadoImage from '../assets/Avocado.jpg'
import Input from "../styledComponents/input";

const AddItem = ({ showModal, setShowModal }) => {

  const dispatch = useDispatch()
  const [searchText, setSearchText] = React.useState('')
  const [catalog, setCatalog] = React.useState([])
  const [isCatalogLoading, setIsCatalogLoading] = React.useState(false)
  const [isCatalogEmpty, setIsCatalogEmpty] = React.useState(false)
  const [isCatalogFetched, setIsCatalogFetched] = React.useState(false)
  const [isInReviewMode, setIsInReviewMode] = React.useState(false)
  React.useEffect(() => { }, [])

  const handleSearch = async () => {
    setIsCatalogLoading(true)
    setIsCatalogEmpty(false)
    setIsInReviewMode(false)
    try {
      const result = await getCatalog(searchText)
      console.log('result', result)
      setCatalog(result)
      if (result.length === 0) setIsCatalogEmpty(true)
      setIsCatalogFetched(true)
      setIsCatalogLoading(false)
    }
    catch (e) {
      setIsCatalogLoading(false)
    }
  }

  const handleInputChange = ({ item, type, value }) => {
    if (isInReviewMode) return
    setCatalog(catalog => {
      return catalog.map(eachCatalog => {
        if (eachCatalog.uuid === item.uuid) {
          eachCatalog[type] = value
        }
        return eachCatalog
      })
    })
  }

  const handleAddProducts = () => {
    let requiredProducts = catalog.filter(eachCatalog => eachCatalog.quantity > 0)
    dispatch(addProductsToCart({ products: requiredProducts }))
  }

  const selectedProductCount = (catalog || []).filter(({ quantity }) => parseInt(quantity) > 0)?.length
  return (<>
    <Modal
      open={showModal}
      title={<Text ellipsis primary bold>{'Add product from Sysco\'s catalog '}</Text>}
      onOk={() => { }}
      width={900}
      onCancel={() => { setShowModal(false) }}
      footer={false}
    >
      <Container space borderTop>
        <Row gutter={10}>
          <Col span={24}>
            <Container space>
              <Text heading>{!isInReviewMode ? 'Search products from Sysco\'s catalog and add quantity' : 'Review before adding products'}</Text>
            </Container>
          </Col>
          {!!!isInReviewMode && <>
            <Col span={12}>
              <SearchBar searchText={searchText} setSearchText={setSearchText} handleSearch={handleSearch} />
            </Col>
            <Col span={12}>
              <Text>Search for beef/chicken/fish</Text>
            </Col>
          </>}
          {!!!isCatalogFetched && !!!isCatalogLoading && <Col span={24}>
            <Row justify={'center'}>
              <Col span={12}>
                <Image src={searchProductImage} />
              </Col>
              <Col span={13}>
                <Container center>
                  <Text green bold xLarge>Search for your product</Text>
                </Container>
              </Col>
            </Row>
          </Col>}
          {
            isCatalogLoading && <Col span={24}><Row justify={'center'}>
              <Col span={12}>
                <Image src={searchProductImage} />
              </Col>
              <Col span={13}>
                <Container center>
                  <Text green bold xLarge>Loading your product</Text>
                </Container>
              </Col>
            </Row>
            </Col>
          }
          {
            !!!isCatalogLoading && !!isCatalogFetched && !!isCatalogEmpty && <Col span={24}>
              <Row span={12} justify='center'>
                <Col span={12}>
                  <Image src={searchProductImage} />
                </Col>
                <Col span={13}>
                  <Container center>
                    <Text green bold xLarge>No products found. Try fish / chicken / beef</Text>
                  </Container>
                </Col>
              </Row>
            </Col>
          }
          {
            !!!isCatalogLoading && !!!isCatalogEmpty && !!catalog.length && <Row>
              <Col span={24}><Container space><Table>
                <thead>
                  <TR background={'lightgrey'}>
                    <TD width={'5px'} borderTop borderBottom radius='top-left'></TD>
                    <TD space='2px' width={'25%'} borderTop borderBottom>
                      <Text primary>Product name</Text>
                    </TD>
                    <TD width={'25%'} borderTop borderBottom>
                      <Text primary>Brand</Text>
                    </TD>
                    <TD width={'15%'} borderTop borderBottom>
                      <Text primary>Packing</Text>
                    </TD>
                    <TD width={'15%'} borderTop borderBottom>
                      <Text primary>Price($)</Text>
                    </TD>
                    <TD width={'15%'} borderTop borderBottom radius='top-right'>
                      <Text primary>Qt.</Text>
                    </TD>
                  </TR>
                </thead>
                <tbody >
                  {(catalog || []).filter(item => !isInReviewMode ? true : item.quantity > 0).map(item => <TR key={item.uuid}>
                    <TD width={'5%'} borderBottom >
                      <Image src={item?.category === 'fruit' ? AppleImage : AvacadoImage} height='50' width='50' />
                    </TD>
                    <TD space width={'35%'} borderBottom >
                      <Text primary>{item.name}</Text>
                    </TD>
                    <TD width={'10%'} borderBottom>
                      <Text primary>{item.brand}</Text>
                    </TD>
                    <TD width={'10%'} borderBottom>
                      <Text primary>{`${item.unit}`}</Text>
                    </TD>
                    <TD width={'10%'} borderBottom>
                      {/* <Text primary bold>{item.quantity}</Text> */}
                      <Input disabled={isInReviewMode} forEdit min={0} type='number' value={item.price} onChange={e => handleInputChange({ item, type: 'price', value: e.target.value })}></Input>
                    </TD>
                    <TD width={'10%'} borderBottom>
                      <Input disabled={isInReviewMode} forEdit min={0} type='number' placeholder="-" value={item.quantity} onChange={e => handleInputChange({ item, type: 'quantity', value: e.target.value })}></Input>
                    </TD>
                  </TR>)}
                </tbody>
              </Table>
              </Container>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={12}>
                    <Container space>
                      <Text green bold>Total </Text><Text green>{`${selectedProductCount} product`}</Text>
                    </Container>
                  </Col>
                  <Col span={12}>
                    <Container space right>
                      <Space>
                        {!!!isInReviewMode && <Button primary disabled={!(selectedProductCount)} onClick={() => setIsInReviewMode(true)}>Review</Button>}
                        {!!isInReviewMode && <>
                          <Button onClick={() => setIsInReviewMode(false)}>Back</Button>
                          <Button primary onClick={() => { handleAddProducts(); setShowModal(false) }}>Add</Button>
                        </>}
                      </Space>
                    </Container>
                  </Col>
                </Row>
              </Col>
            </Row>
          }

        </Row>
      </Container>
    </Modal>
  </>)
}

export default AddItem