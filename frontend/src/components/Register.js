import React, { useState } from 'react';
import "./Register.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:2000/api/v1/register', { username, email, password });
          setMessage(response.data.message);
          
          if (response.status === 200) {
            setMessage('User registered successfully.');
            setTimeout(() => {
                navigate('/');
            }, 4000);
        }
        } catch (error) {
          if (error.response && error.response.data) {
            setMessage(error.response.data.message);
          } else {
            setMessage('An unexpected error occurred.');
            console.error(error);
          }
        }
    };

    return (
        <div>
            <div>
                <Link to="/">Login</Link>
                <form className="main-form" onSubmit={handleSubmit}>
                    <h1>Signup</h1>
                    {message && <div className="message">{message}</div>} 
                    <div className="form-container">
                        <input type="text" className="form-control" placeholder="Add a username" onChange={(e) => setUsername(e.target.value)} />
                        <input type="email" className="form-control" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Signup</button>
                    </div>  
                </form>
            </div>
        </div>
    );
};

export default Register;

