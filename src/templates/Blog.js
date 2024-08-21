import React, { useState, useEffect , useContext} from 'react';
import axios from 'axios';
import { PostsContext } from './PostsContext'; 

const Blog = () => {
  const [input, setInput] = useState('');
  const { posts, addPost } = useContext(PostsContext);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      axios.post('http://localhost:3001/api/posts', { text: input })
        .then(response => {
          addPost(response.data);
          setInput(''); 
          alert('Post Enviado com sucesso!')
        })
        .catch(error => {
          console.error('Error posting data:', error);
        });
    }
  };

return (
    <div>
      <h1>Novo Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
        <textarea value={input} onChange={handleChange} rows="5" cols="50" />
        </label>
        <button className="botao" type="submit">Postar</button>
      </form>
    </div>
  );
};

export default Blog;
