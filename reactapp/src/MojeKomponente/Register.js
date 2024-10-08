import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaIdCard, FaBirthdayCake, FaCamera, FaClipboardList, FaPen } from 'react-icons/fa';

import TextInput from './TextInput';
import FileInput from './FileInput';
import TextareaInput from './TextareaInput';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  let navigate= useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_id: '1',  // Setovanje role_id na 1
    interests: '',
    profile_photo: null,
    bio: '',
    birthdate: ''
  });

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

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
      navigate("/login")
    } catch (error) {
      console.error(error);
      alert('An error occurred during registration');
    }
  };

  const handleGenerateRandomUser = async () => {
    try {
      const response = await axios.get('https://api.api-ninjas.com/v1/randomuser', {
        headers: { 'X-Api-Key': 'jcWCqSr114CjwUWVpd58L3vDj1sKV6bcdHWVk8pS' }
      });
      
      const randomUser = response.data;
      
      setFormData({
        name: randomUser.name,
        email: randomUser.email,
        password: '',
        password_confirmation: '',
        role_id: '1',
        interests: '',
        profile_photo: null,
        bio: '',
        birthdate: randomUser.birthday,
      });

      alert('Random user data generated');
    } catch (error) {
      console.error(error);
      alert('Failed to generate random user data');
    }
  };

  const handleGenerateRandomPassword = async () => {
    try {
      const response = await axios.get('https://api.api-ninjas.com/v1/passwordgenerator', {
        headers: { 'X-Api-Key': 'jcWCqSr114CjwUWVpd58L3vDj1sKV6bcdHWVk8pS' }
      });

      // Proveravamo šta tačno API vraća
      console.log(response.data);

      // Ovde očekujemo da je lozinka u `password` ključu, ali to može zavisiti od formata odgovora
      const randomPassword = response.data.password || response.data.random_password || response.data; // Pokušaj da uhvatiš pravu vrednost

      setFormData((prevData) => ({
        ...prevData,
        password: randomPassword,
        password_confirmation: randomPassword
      }));

      alert('Random password generated');
    } catch (error) {
      console.error(error);
      alert('Failed to generate random password');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Register for Forum</h1>
        <div className="button-group">
          <button type="button" className="generate-button" onClick={handleGenerateRandomUser}>
            Generate Random User
          </button>
          <button type="button" className="generate-button" onClick={handleGenerateRandomPassword}>
            Generate Random Password
          </button>
        </div>
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
              <TextInput
                icon={FaLock}
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="Confirm Password"
                type={showPassword ? "text" : "password"}
                required
              />
              <button type="button" className="register-button" onClick={handleNextStep}>Next</button>
            </>
          )}

          {step === 2 && (
            <> 
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
