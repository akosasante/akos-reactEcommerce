import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [userName, setUserName] = useState('');
  const { handleLogin, authState } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const user = { email, password };
    const success = await handleLogin(user);
    if (success) {
      setEmail('');
      setPassword('');
      setRedirectToHome(true);
    }
  };

  if (redirectToHome) {
    return <Redirect to='/' />;
  }

  if (authState?.authLoading) {
    return <span>Logging in...</span>;
  }

  if (authState?.authError) {
    return <span>Encountered error logging in</span>;
  }

  return (
    <div>
      {userName && <p>Welcome {userName}!</p>}
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      <p>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </div>
  );
};

export default Login;
