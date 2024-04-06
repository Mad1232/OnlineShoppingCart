import React from 'react';
import ReactDOM from 'react-dom/client';
import Shop from './Shopping_bootstrap.js';
import "bootstrap/dist/css/bootstrap.css";
import Checkout from './Checkout.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Shop />
  </React.StrictMode>
);

