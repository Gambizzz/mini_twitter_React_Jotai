import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  return (
    <div className='post-card'>
      <p className='post-title'> <strong>{post.attributes.title}</strong> </p>
      <p className='post-content'> {post.attributes.text} </p>
      {post.user && (
        <p>
          Posted by <Link to={`/user/${post.user.id}`}> {post.user.username} </Link>
        </p>
      )}
    </div>
  );
};

export default PostItem;




