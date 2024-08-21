import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', { username, password });
      const token = response.data.token;
      setToken(token); 
      navigate('/Novo Post'); 
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <form className='formulario' onSubmit={handleSubmit}>
      <div className='user' >
        <label>Username:</label>
        <input className='input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className='senha' >
        <label>Password:</label>
        <input className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className='botao submit' type="submit">Login</button>
    </form>
  );
};

export default Login;
