import React, { useState } from 'react';
import './App.css';
import Header from './templates/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './templates/Home.js'
import Blog from './templates/Blog.js';
import Contato from './templates/Contato.js'
import Produtos from './templates/Posts.js';
import { PostsProvider } from './templates/PostsContext.js';
import Login from './templates/login.js';
import ProtectedRoute from './ProtectedRoute.js';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleSetToken = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };


  return (
    <Router>
      <PostsProvider>
        <div className="App">
          <Header />
          <main className="Main">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/Home" element={<Home />} /> */}
              <Route path="/Posts" element={<Produtos />} />
              <Route path="/Novo Post" element={<ProtectedRoute token={token}><Blog /></ProtectedRoute>} />
              {/* <Route path="/Novo Post" element={<Blog />} /> */}
              <Route path="/Contato" element={<Contato />} />
              <Route path="/login" element={<Login setToken={handleSetToken} />} />
            </Routes>
            <div className="Content"> 
            </div>
          </main>
        </div>
      </PostsProvider>
    </Router>
  );
}

export default App;
