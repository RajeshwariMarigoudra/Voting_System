import React from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from "react-cookies";
const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    alert('Signing out');
    try {
      cookie.remove('token').then(() => {
        navigate('/signin');
      });
    }
    catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
};

export default SignOut;
