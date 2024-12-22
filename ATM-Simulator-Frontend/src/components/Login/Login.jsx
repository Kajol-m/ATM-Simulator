import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported or replace it with your HTTP client
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import './Login.css';

const Login = () => {
    const [accountNumber, setAccountNumber] = useState("");
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/login", {
                accountNumber,
                pin,
            });            
            
            
            if (response.status === 200) {
                //localStorage.setItem("token",token);
                localStorage.setItem("accountNumber",accountNumber);
                navigate('/dashboard');
            }
        } catch (error) {
            setError("Invalid Account Number or PIN");
        }
    };

    return (
        <>
            <h3 className='login-header'>Login</h3>
            <form onSubmit={handleLogin} className='login-form' autocomplete="off">
                <div className='login-input'>
                <Input
                    type="text"
                    labelText="Account Number"
                    placeholderText="Enter Account Number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    id="accountNumber"
                />
                <Input
                    type="password"
                    labelText="PIN"
                    placeholderText="Enter PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    id="pin"
                />
                </div>
                {error && <p className="error-message">{error}</p>}
                <Button buttonText="Login" />
            </form>
            <p>
                If you don't have any account, you may <Link to='/register'>Register</Link>
            </p>
        </>
    );
};

export default Login;
