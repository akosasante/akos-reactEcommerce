import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import styled from 'styled-components';
const rootUrl = 'https://ecommerce-6kwa.onrender.com';

const Logout = () => {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async (userCredentials) => {
    setLogoutLoading(true);
    try {
      const url = `${rootUrl}/api/v1/auth/logout`;
      const response = await axios.get(url, userCredentials, {
        withCredentials: true,
      });
      console.log(response);
      setLogoutLoading(false);
      return true;
    } catch (error) {
      console.log(error);
      const errorPayload =
        error instanceof AxiosError ? error.response.data : error;
      console.error(errorPayload);
      setLogoutLoading(false);
      return false;
    }
  };

  if (redirectToHome) {
    return <Redirect to="/" />;
  }
  if (logoutLoading) {
    return <span>Logging you out...</span>;
  }
  return (
    <Wrapper>
      <h4>If you want to log out please press the button </h4>

      <button className="btn" onClick={handleLogout}>
        {' '}
        Logout
      </button>
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

  h4 {
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
