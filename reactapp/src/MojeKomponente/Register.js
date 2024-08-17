import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaBirthdayCake, FaCamera, FaClipboardList, FaPen } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_id: '',
    interests: '',
    profile_photo: null,
    bio: '',
    birthdate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Registration successful');
    } catch (error) {
      console.error(error);
      alert('An error occurred during registration');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Register for Forum</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-container">
            <FaUser className="register-icon" />
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          </div>
          <div className="input-container">
            <FaEnvelope className="register-icon" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          </div>
          <div className="input-container">
            <FaLock className="register-icon" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          </div>
          <div className="input-container">
            <FaLock className="register-icon" />
            <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} placeholder="Confirm Password" required />
          </div>
          <div className="input-container">
            <FaIdCard className="register-icon" />
            <input type="number" name="role_id" value={formData.role_id} onChange={handleChange} placeholder="Role ID" required />
          </div>
          <div className="input-container">
            <FaClipboardList className="register-icon" />
            <input type="text" name="interests" value={formData.interests} onChange={handleChange} placeholder="Interests" />
          </div>
          <div className="input-container">
            <FaCamera className="register-icon" />
            <input type="file" name="profile_photo" onChange={handleFileChange} />
          </div>
          <div className="input-container">
            <FaPen className="register-icon" />
            <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio"></textarea>
          </div>
          <div className="input-container">
            <FaBirthdayCake className="register-icon" />
            <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} placeholder="Birthdate" />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
