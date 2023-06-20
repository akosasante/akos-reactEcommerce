import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
const rootUrl = 'https://ecommerce-6kwa.onrender.com';

const Logout = () => {
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleLogout = async () => {
    try {
      const url = `${rootUrl}/api/v1/auth/logout`;
      const response = await fetch(url);

      if (response.ok) {
        console.log('Logout successful');
        setRedirectToHome(true);
      } else {
        console.log('Logout failed');
       
      }
    } catch (error) {
      console.log(error);
     
    }
  };

  if (redirectToHome) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
        <h4>If you want to log out please press the button   </h4>

          <button className='btn' onClick={handleLogout}>  Logout</button>

       
            </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-primary-8);
  width: 100%;
  min-height: 10vh;
  display: flex;
  align-items: center;
  color: var(--clr-primary-1);

  h4{
    margin: 20px;
  }
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`;



export default Logout;
