import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { useAtom } from 'jotai';
import { authAtom } from '../../context/authAtom';

const UserProfile = () => {
  const { userId } = useParams();
  const [auth] = useAtom(authAtom);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await api.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        setUser(userResponse.data);

        const decodedToken = auth.token ? parseJwt(auth.token) : null;
        const loggedInUserId = decodedToken ? decodedToken.id : null;
        setLoggedInUserId(loggedInUserId);

        const postsResponse = await api.get(`/posts?user.id=${userId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (Array.isArray(postsResponse.data)) {
          setPosts(postsResponse.data);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error('Error fetching user or posts', error);
        setPosts([]);
      }
    };

    fetchUser();
  }, [auth, userId]);

  if (!user) return <div> Loading... </div>;

  return (
    <div className='user-profile'>
      <h2> {user.username} </h2>
      <p> {user.description} </p>

      {loggedInUserId === user.id}

      <h3> Your posts </h3>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <p> No posts available </p>
      )}
    </div>
  );
};

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export default UserProfile;


