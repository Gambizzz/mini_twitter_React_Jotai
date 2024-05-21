import React, { useState } from 'react';
import api from '../../api';
import { useAtom } from 'jotai';
import { authAtom } from '../../context/authAtom';

const CreatePost = ({ updatePosts }) => {
  const [auth] = useAtom(authAtom);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('http://localhost:1337/api/posts', {
        data: {
          title: title,
          text: text,
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      const newPost = { ...response.data.data, user: auth.user };

      updatePosts(newPost);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='create-post-form'>
      <h2> Create your post </h2>
      <form className='post-form' onSubmit={handleSubmit}>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' required/>
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder='Write your post here...' 
          required
        />
        <button className='post-btn' type='submit'> Post </button>
      </form>
    </div>
  );
};

export default CreatePost;








