import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import styled from 'styled-components';
import './styles.css';
import UpdatePassword from './UpdatePassword,js';
const rootUrl = 'https://ecommerce-6kwa.onrender.com';

//LOGOUT
const Logout = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const url = `${rootUrl}/api/v1/users/showMe`;
      axios
        .get(url, { withCredentials: true })
        .then((response) => {
          console.log(response);
          setCurrentUser(response?.data?.user);
        })
        .catch((error) => {
          const errorPayload =
            error instanceof AxiosError ? error?.response?.data : error;
          console.error(errorPayload);
        });
    }
    fetchData();
  }, []);

  const personLoggedIn = currentUser?.role === 'admin' || 'user';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [message, setMessage] = useState('');

  //UPDATE USER DATA
  const handleUpdate = async () => {
    setUpdateLoading(true);
    try {
      const url = `${rootUrl}/api/v1/users/updateUser`;
      const user = currentUser;
      

      if (name) {
        user.name = name;
      }

      if (email) {
        user.email = email;
      }

      const response = await axios.patch(url, user, { withCredentials: true });

      console.log(response);
      setUpdateLoading(false);
      setMessage('Update successful');
    } catch (error) {
      console.error(error);
      setUpdateLoading(false);
      setMessage('Update failed, please check both fields');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name && !email) {
      setMessage('Please enter at least one field to update');
      return;
    }
    handleUpdate();
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const url = `${rootUrl}/api/v1/auth/logout`;
      const response = await axios.get(url, {
        withCredentials: true,
      });
      console.log(response);
      setLogoutLoading(false);
      setRedirectToHome(true); //added
      return true;
    } catch (error) {
      console.log(error);
      const errorPayload =
        error instanceof AxiosError ? error?.response?.data : error;
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
      <div className="left">
        {personLoggedIn && (
          <div>
            <h3>Update User</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name</label>
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label>Email</label>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              {/* <button type="submit">
                {updateLoading ? 'Updating...' : 'Update User'}
              </button> */}

              <button type="submit" className="crudbtn">
                <span>{updateLoading ? 'Updating...' : 'Update User'}</span>
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 74 74"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="37"
                    cy="37"
                    r="35.5"
                    stroke="black"
                    stroke-width="3"
                  ></circle>
                  <path
                    d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                    fill="black"
                  ></path>
                </svg>
              </button>
            </form>
            <p>{message}</p>
          </div>
        )}
      </div>

<UpdatePassword />

      <h4>If you want to log out please press the button </h4>

      <button className="btn" onClick={handleLogout}>
        {' '}
        Logout
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 30px;
  background: var(--clr-primary-8);
  width: 100%;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
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
