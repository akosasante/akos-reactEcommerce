import React from 'react';
import { FeaturedProducts, Hero, Services, Contact } from '../components';
  import AddProduct from './AddProduct';

const HomePage = () => {

  // need to check here if user.role === 'admin'- show <AddProduct/> component

  return (
    <main>
      <Hero />
      <AddProduct/>
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  );
};

export default HomePage;
