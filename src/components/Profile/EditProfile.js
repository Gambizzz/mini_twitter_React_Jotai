import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { authAtom } from '../../context/authAtom';

const EditProfile = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        const user = response.data;
        setUsername(user.username);
        setDescription(user.description || '');
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, [auth.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/users/${auth.user.id}`, {
        username,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      setAuth({
        ...auth,
        user: response.data,
      });

      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  return (
    <div className='edit-form1'>
      <h2> Edit Profile </h2>
      <form className='edit-form2' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'> Username </label>
          <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor='description'> Description </label>
          <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <button className='edit-btn' type='submit'> Edit </button>
      </form>
    </div>
  );
};

export default EditProfile;