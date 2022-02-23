import logo from './logo.svg';
import './App.css';
import ProductCard from './components/ProductCard/ProductCard.js';
import BasketCard from './components/BasketCard/BasketCard';
import productData from "./data/products.json";
import { updateBasketItems, getBasketTotal, formatBasket } from "../src/utils/checkout.js";
import React, { useState } from 'react';

function App() {

  const [basket, setBasketItems] = useState([]);

  const updateBasketItemsInState = (product, plus) => {
    const newBasket = updateBasketItems([...basket], product, plus);

    setBasketItems(newBasket);

    return;
  }

  const renderLineItems = () => {
    return productData.map((product, index) => {
      return <ProductCard key={'product-card-' + index} item={product} clickAction={updateBasketItemsInState}/>
    })
  };

  const renderBasketItems = () => {
    if(!basket.length) return;
    const finalBasket = formatBasket(basket);
    let basketArray = [];

    for(let key in finalBasket) {
      basketArray.push(finalBasket[key])
    }
    
    return basketArray.map((item, index)=> {
      return <BasketCard key={'basket-item-' + index} item={item}/>
    })
  }

  const getTotal = () => {
    return getBasketTotal(formatBasket(basket))
  }

  return (
    <div className="App">
      <div className="lineItemsContainer">
        <h1>Products:</h1>
        {renderLineItems()}
      </div>
      <div className="basketContainer">
        <h3>Basket:</h3>
        {renderBasketItems()}
        <p>Total: {getTotal()}</p>
      </div>
    </div>
  );
}

export default App;
