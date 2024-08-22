import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pocetna from './MojeKomponente/Pocetna';
import './App.css';
import Register from './MojeKomponente/Register';
import Login from './MojeKomponente/Login';
import Navbar from './MojeKomponente/Navbar'; // Importujte Navbar komponentu
import PostsList from './MojeKomponente/Post/PostsList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Proveri da li postoji token u sessionStorage kada se aplikacija učita
    const token = sessionStorage.getItem('auth_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> {/* Dodajte Navbar komponentu */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Pocetna />} />
          {isLoggedIn ? (
            <Route path="/posts" element={<PostsList></PostsList>} />
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
