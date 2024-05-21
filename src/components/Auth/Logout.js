import React from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { authAtom } from '../../context/authAtom';

const Logout = () => {
  const [, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    setAuth({ token: null, user: null });
    navigate('/login');
  };

  return (
    <button className='logout-btn' onClick={handleLogout}> LOGOUT </button>
  );
};

export default Logout;
