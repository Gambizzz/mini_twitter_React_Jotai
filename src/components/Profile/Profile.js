import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import api from '../../api';
import { authAtom } from '../../context/authAtom';

const Profile = () => {
  const [auth] = useAtom(authAtom);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, [auth.token]);

  if (!user) return <div> Loading... </div>;

  return (
    <div className='profile-infos'>
      <h2> Profile </h2>
      <p> Username : <Link to={`/user/${user.id}`}> <strong className='details'> {user.username} </strong> </Link> </p>
      <p> Description : {user.description} </p>
      <Link to='/edit-profile' className='link-edit'> Edit profile </Link>
    </div>
  );
};

export default Profile;

