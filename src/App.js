import React from 'react'
import './App.css';
// import { Header } from './components/headerComponent/header';
import { useSelector, useDispatch } from 'react-redux'
import { Navbar } from './components/navbar';
import { TitleBar } from './components/titlebar';
import { OrderSummary } from './components/orderSummary';
import { OrderDetails } from './components/orderDetails';
import Container from './styledComponents/container';
import useWindowSize from './customHooks/useWindowsResize';

function App() {

  const { windowHeight } = useWindowSize()
  const navbarRef = React.useRef(null)
  const titlebarRef = React.useRef(null)

  const getHeight = () => {
    if (navbarRef?.current && titlebarRef?.current) {
      let result = navbarRef?.current?.offsetHeight + titlebarRef.current?.offsetHeight
      return !isNaN(result) ? result : 0
    }
  }

  return (
    <div className="App">
      <Navbar navbarRef={navbarRef} />
      <TitleBar titlebarRef={titlebarRef} />
      <Container usedHeight={getHeight()}>
        <OrderSummary />
        <OrderDetails />
      </Container>
    </div>
  );
}

export default App;
