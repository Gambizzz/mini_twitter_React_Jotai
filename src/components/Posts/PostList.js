import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import api from '../../api';
import { authAtom } from '../../context/authAtom';
import PostItem from './PostItem';
import CreatePost from './CreatePost';

const PostList = () => {
  const [auth] = useAtom(authAtom);
  const [posts, setPosts] = useState([]);

  const updatePosts = (newPost) => {
    setPosts(prevPosts => {
      if (Array.isArray(prevPosts)) {
        return [newPost, ...prevPosts];
      } else {
        console.error("prevPosts is not an array:", prevPosts);
        return [newPost];
      }
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts?populate=*', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        const postsWithUser = response.data.data.map(post => ({
          ...post,
          user: post.user
        }));

        setPosts(postsWithUser);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };
    fetchPosts();
  }, [auth]);
  console.log(posts);

  return (
    <div>
      <CreatePost updatePosts={updatePosts} />
      <h2 className='posts-title'> ALL POSTS </h2>
      <div className='post-container'>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;







