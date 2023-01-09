import React from 'react'
import './App.css';
// import { Header } from './components/headerComponent/header';
import { useSelector, useDispatch } from 'react-redux'
import { Navbar } from './components/navbar';
import { TitleBar } from './components/titlebar';
import { OrderSummary } from './components/orderSummary';
import { OrderDetails } from './components/orderDetails';

function App() {

  return (
    <div className="App">
      <Navbar />
      <TitleBar />
      <OrderSummary />
      <OrderDetails />
    </div>
  );
}

export default App;
