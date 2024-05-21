import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { authAtom } from '../../context/authAtom';

const Register = () => {
  const [, setAuth] = useAtom(authAtom);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/local/register', {
        username,
        description,
        email,
        password,
      });

      const { jwt, user } = response.data;
      setAuth({ token: jwt, user });

      localStorage.setItem('jwtToken', jwt);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className='register-form1'>
      <h2> Register </h2>
      <form className='register-form2' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'> Username </label>
          <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor='description'> Description </label>
          <input type='text' id='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div>
          <label htmlFor='email'> Email </label>
          <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor='password'> Password </label>
          <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        {error && <p style={{ color: 'red' }}> {error} </p>}
        <button className='register-btn' type='submit'> Register </button>
      </form>
    </div>
  );
  
};

export default Register;