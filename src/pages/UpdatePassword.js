import React, { useState , useEffect } from 'react';
import axios , { AxiosError } from 'axios';
import styled from 'styled-components';
import './styles.css';

const rootUrl = 'https://ecommerce-6kwa.onrender.com';

const UpdatePassword = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  //fetch user id
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

  const user = currentUser;

  const url = `${rootUrl}/api/v1/users/updateUserPassword`;

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    setUpdateLoading(true);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!oldPassword || !newPassword) {
        setMessage('Please provide both values');
        return;
      }
      handleUpdate();
    };

    try {
      const response = await axios.patch(
        url,
        {
          oldPassword,
          newPassword,
        },
        {
          withCredentials: true,
        }
      );

      setUpdateLoading(false);
      setMessage('Success! Password updated!');
    } catch (error) {
      setUpdateLoading(false);
      setMessage('Update failed');
    }
  };

  return (
    <div className="left">
      {currentUser && (
        <div>
          <h2>Update Password</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div>
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button type="submit">
              {updateLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
