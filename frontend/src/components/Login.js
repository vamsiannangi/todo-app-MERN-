import React, { useContext, useState } from 'react';
import "./Register.css";
import axios from 'axios';
import { store } from '../App';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [token, setToken] = useContext(store);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();


  try {
    const response = await axios.post('http://localhost:2000/api/v1/login', { email, password });
    setToken(response.data.token);
    navigate('/TodoList'); 
  } catch (error) {
    setMessage('Invalid credentials. Please check your email and password and try again.');
  }
}

  return (
    <div>
      <div>
      <Link to="/register">Signup</Link>
      <form className="main-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          {message && <div className="message">{message}</div>}
          <div className="form-container">
            <input type="email" className="form-control" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="form-control" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
