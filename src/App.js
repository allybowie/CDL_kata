import logo from './logo.svg';
import './App.css';
import ProductCard from './components/ProductCard/ProductCard.js';
import productData from "./data/products.json";
import React, { useState } from 'react';

function App() {

  const [basket, setBasketItems] = useState([]);

  const updateBasketItems = (product, plus) => {
    const newBasket = [...basket];

    if(plus) {
      newBasket.push(product);
    } else {
      newBasket.splice(newBasket.indexOf(product), 1)
    }

    setBasketItems(newBasket);

    return;
  }

  const renderLineItems = () => {
    return productData.map((product, index) => {
      return <ProductCard key={'product-card-' + index} item={product} clickAction=""/>
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
