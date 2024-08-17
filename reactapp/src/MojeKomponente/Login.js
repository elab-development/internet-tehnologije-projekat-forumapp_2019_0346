import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Koristimo isti CSS kao za Register komponentu
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Login successful');
  
    } catch (error) {
      console.error(error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-page"> {/* Isti CSS kao i za Register komponentu */}
      <div className="register-container">
        <h1 className="register-title">Login to Forum</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-container">
            <FaEnvelope className="register-icon" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="input-container">
            <FaLock className="register-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <div className="password-toggle" onClick={toggleShowPassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button type="submit" className="register-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
