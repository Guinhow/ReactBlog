import React, { useContext } from 'react';
import { PostsContext } from './PostsContext';

const Produtos = () => {
  const { posts } = useContext(PostsContext);

  return (
    <div className='posts-top'>
      <h1>Posts</h1>
      <div className='posts-content'>
        {posts.map((post, index) => (
          <div key={index} style={{ marginBottom: '20px', whiteSpace: 'pre-wrap' }}>
            {post.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Produtos;
