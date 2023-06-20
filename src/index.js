import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ProductsProvider } from './context/products_context';
import { UserProvider } from './context/user_context';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <UserProvider>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </UserProvider>
);
