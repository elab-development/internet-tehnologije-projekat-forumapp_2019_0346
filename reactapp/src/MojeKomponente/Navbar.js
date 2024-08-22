import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';  

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    let navigate = useNavigate();
  const handleLogout = async () => {
    try {
 
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
        }
      });

      // Obrišite token iz session storage-a
      sessionStorage.removeItem('auth_token');
      setIsLoggedIn(false);
      navigate("/")
    } catch (error) {
      console.error('Logout failed:', error);
      alert('An error occurred during logout');
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">My App</Link>
      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            <Link to="/posts" className="navbar-link">Posts</Link>
            <button onClick={handleLogout} className="navbar-link">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
