import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useUserContext } from "../context/user_context";
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-with-circle.svg'
import './styles.css';


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
    <ArrowIcon />
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
