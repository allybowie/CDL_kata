import logo from './logo.svg';
import './App.css';
import ProductCard from './components/ProductCard/ProductCard.js';
import productData from "./data/products.json";

function App() {
  const renderLineItems = () => {
    return productData.map((product, index) => {
      return <ProductCard key={'product-card-' + index} item={product}/>
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
