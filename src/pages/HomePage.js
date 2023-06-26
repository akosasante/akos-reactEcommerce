import React, { useEffect, useState } from 'react';
import { FeaturedProducts, Hero, Services, Contact } from '../components';
import AddProduct from './AddProduct';
import axios, { AxiosError } from 'axios';

const rootUrl = 'https://ecommerce-6kwa.onrender.com';
const HomePage = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const url = `${rootUrl}/api/v1/users/showMe`;
      axios
        .get(url, { withCredentials: true })
        .then((response) => {
          console.log(response);

          // if (response && response.data && response.data.user) {
          //   return response.data.user;
          // }

          setCurrentUser(response?.data?.user);
        })
        .catch((error) => {
          const errorPayload =
            error instanceof AxiosError ? error?.response?.data : error;
          console.error(errorPayload);
        });
    }
    fetchData();
    // By using empty array [], for the "dependencies" argument of useEffect, it tells React to run this useEffect hook only *once*, the first time this component/context is rendered
  }, []);

  const isAdminLoggedIn = currentUser?.role === 'admin';
  return (
    <main>
      <Hero />

      {isAdminLoggedIn && <AddProduct />}
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  );
};

export default HomePage;
