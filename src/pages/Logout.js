import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const Logout = () => {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const { handleLogout, authState } = useUserContext();

  if (redirectToHome) {
    return <Redirect to='/' />;
  }

  if (authState?.authLoading) {
    return <span>Logging out...</span>;
  }

  if (authState?.authError) {
    return <span>Encountered error logging out</span>;
  }

  return (
    <div>
      <h4>If you want to log out please press the button</h4>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
