import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaBirthdayCake, FaCamera, FaClipboardList, FaPen } from 'react-icons/fa';

import TextInput from './TextInput';
import FileInput from './FileInput';
import TextareaInput from './TextareaInput';

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

  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_photo: e.target.files[0] });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
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
          {step === 1 && (
            <>
              <TextInput
                icon={FaUser}
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <TextInput
                icon={FaEnvelope}
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                required
              />
              <TextInput
                icon={FaLock}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                type="password"
                required
              />
              <TextInput
                icon={FaLock}
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="Confirm Password"
                type="password"
                required
              />
              <button type="button" className="register-button" onClick={handleNextStep}>Next</button>
            </>
          )}

          {step === 2 && (
            <>
              <TextInput
                icon={FaIdCard}
                name="role_id"
                value={formData.role_id}
                onChange={handleChange}
                placeholder="Role ID"
                type="number"
                required
              />
              <TextInput
                icon={FaClipboardList}
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="Interests"
              />
              <FileInput
                icon={FaCamera}
                name="profile_photo"
                onChange={handleFileChange}
              />
              <TextareaInput
                icon={FaPen}
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
              />
              <TextInput
                icon={FaBirthdayCake}
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                placeholder="Birthdate"
                type="date"
              />
              <div className="button-container">
                <button type="button" className="register-button" onClick={handlePrevStep}>Back</button>
                <button type="submit" className="register-button">Register</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
