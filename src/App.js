import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch products
    axios.get('http://localhost:3001/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const createOrder = (productId) => {
    axios.post('http://localhost:3002/orders', {
      productId: productId,
      quantity: 1
    })
      .then(res => {
        alert('Order created!');
        setOrders([...orders, res.data]);
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>E-Commerce Store</h1>
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <button onClick={() => createOrder(product.id)}>Buy Now</button>
        </div>
      ))}
    </div>
  );
}

export default App;
