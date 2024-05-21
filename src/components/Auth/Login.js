import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { authAtom } from '../../context/authAtom';

const Login = () => {
  const [, setAuth] = useAtom(authAtom);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/local', {
        identifier,
        password,
      });

      const { jwt, user } = response.data;
      setAuth({ token: jwt, user });

      localStorage.setItem('jwtToken', jwt);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className='login-form1'>
      <h2> Login </h2>
      <form className='login-form2' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='identifier'> Email or Username </label>
          <input type='text' id='identifier' value={identifier} onChange={(e) => setIdentifier(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor='password'> Password </label>
          <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        {error && <p style={{ color: 'red' }}> {error} </p>}
        <button className='login-btn' type='submit'> Login </button>
      </form>
    </div>
  );
};

export default Login;