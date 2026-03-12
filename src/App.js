import React, { useState, useEffect } from 'react';
import axios from 'axios';

// API URLs: use REACT_APP_* at build time, or runtime host + default ports for K8s NodePort
const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const productPort = process.env.REACT_APP_PRODUCT_PORT || '30001';
const orderPort = process.env.REACT_APP_ORDER_PORT || '30002';
const productUrl = process.env.REACT_APP_PRODUCT_URL || `http://${host}:${productPort}`;
const orderUrl = process.env.REACT_APP_ORDER_URL || `http://${host}:${orderPort}`;

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${productUrl}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const createOrder = (productId) => {
    axios.post(`${orderUrl}/orders`, {
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
