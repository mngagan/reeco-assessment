import React from 'react';
import { Navbar } from './components/navbar';
import { OrderDetails } from './components/orderDetails';
import { OrderSummary } from './components/orderSummary';
import { TitleBar } from './components/titlebar';
import useWindowSize from './customHooks/useWindowsResize';
import Container from './styledComponents/container';
import './App.css';

function App() {

  const navbarRef = React.useRef(null)
  const titlebarRef = React.useRef(null)

  const getHeight = () => {
    if (navbarRef?.current && titlebarRef?.current) {
      let result = navbarRef?.current?.offsetHeight + titlebarRef.current?.offsetHeight
      return !isNaN(result) ? result : 0
    }
  }

  return (
    <div className='App'>
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
