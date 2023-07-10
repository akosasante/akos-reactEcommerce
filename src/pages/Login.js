import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useUserContext } from "../context/user_context";
import './styles.css';
const rootUrl = 'https://ecommerce-6kwa.onrender.com';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [userName, setUserName] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const { setCurrentUser } = useUserContext();

  const handleLogin = async (userCredentials) => {
    setLoginLoading(true);
    try {
      const url = `${rootUrl}/api/v1/auth/login`;
      const response = await axios.post(url, userCredentials, {
        withCredentials: true,
      });

     



      console.log(response);
      setLoginLoading(false);
      return response?.data?.user;
    } catch (error) {
      const errorPayload =
        error instanceof AxiosError ? error?.response?.data : error;
      console.error(errorPayload);
      setLoginLoading(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const user = { email, password };
    const loggedInUser = await handleLogin(user);
    if (loggedInUser) {
      setEmail('');
      setPassword('');
      setCurrentUser(loggedInUser);
      setRedirectToHome(true);
    }
  };

  if (redirectToHome) {
    return <Redirect to="/" />;
  }
  if (loginLoading) {
    return <span>Logging in...</span>;
  }

  return (
    <div className='center'>
    <div>
      {userName && <p>Welcome {userName}!</p>}
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email </label>
          <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
        </div>
        <div>
          <label>Password </label>
          <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
        </div>
        {/* <button type="submit">Login</button> */}
        <button type="submit" className='crudbtn' >
    <span>Login</span>
    <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
        <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
    </svg>
</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
    </div>
  );
};

export default Login;
