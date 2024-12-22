import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import './Register.css';
import axios from 'axios';

const Register = () => {
  const generateAccountNumber = () => {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  };

  const [accountNumber] = useState(generateAccountNumber());
  const [pin, setPin] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Fixed capitalization

    try {
      const response = await axios.post('http://localhost:8080/register', {
        accountNumber,
        pin,
        name,
        balance: 0.0, // Initial balance is fixed
      });

      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error.response || error.message);
      setError('Error registering user');
    }
  };

  return (
    <>
      <h3 className="register-header">Register</h3>
      <form onSubmit={handleSubmit} className="register-form">
        <div className='register-input'>
        <Input
          type="text"
          labelText="Account Number"
          placeholderText="Enter Account Number"
          value={accountNumber}
          readOnly // Make the account number field read-only
        />
        <Input
          type="text"
          labelText="Name"
          placeholderText="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          labelText="PIN"
          placeholderText="Enter PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        </div>
        {error && <p className="error-message">{error}</p>} {/* Optional: Add a CSS class for styling */}
        <Button buttonText="Register" />
      </form>
      <p>
        If you have an account you may <Link to="/login">Login</Link>
      </p>
    </>
  );
};

export default Register;
