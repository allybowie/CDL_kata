import logo from './logo.svg';
import './App.css';
import ProductCard from './components/ProductCard/ProductCard.js';
import productData from "./data/products.json";
import { updateBasketItems } from "../src/utils/checkout.js";
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
  }

  return (
    <div className="App">
      <div className="lineItemsContainer">
        <h1>Products:</h1>
        {renderLineItems()}
      </div>
    </div>
  );
}

export default App;
