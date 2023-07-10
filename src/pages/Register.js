import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import './styles.css';
import { useUserContext } from "../context/user_context";

const rootUrl = 'https://ecommerce-6kwa.onrender.com';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const { setCurrentUser } = useUserContext();

  const handleRegister = async (userCredentials) => {
    setRegisterLoading(true);
    try {
      const url = `${rootUrl}/api/v1/auth/register`;
      const response = await axios.post(url, userCredentials, {
        withCredentials: true,
      });

      console.log(response);
      setCurrentUser(response?.data?.user);
      setRegisterLoading(false);
      return true;
    } catch (error) {
      const errorPayload =
        error instanceof AxiosError ? error?.response?.data : error;
      console.error(errorPayload);
      setRegisterLoading(false);

      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const user = { name, email, password };
    const success = await handleRegister(user);
    if (success) {
      setName('');
      setEmail('');
      setPassword('');
      setRedirectToHome(true);
    }
  };

  if (redirectToHome) {
    return <Redirect to="/" />;
  }
  
  if (registerLoading) {
    return <span>Registering...</span>;
  }

  return (
    <div className='center'>
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name </label>
          <div>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          </div>
        </div>
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
          <label>Password</label>
          <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
        </div>
        {/* <button type="submit">Register</button> */}
        <button type="submit" className='crudbtn' >
    <span>Register</span>
    <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
        <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
    </svg>
</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
    </div>
  );
};

export default Register;
