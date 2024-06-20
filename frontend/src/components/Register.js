import React, { useState } from 'react';
import "./Register.css";
import axios from 'axios';

function Register() {
    const [username,setUsername]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:2000/api/v1/register', {username,email,password});
          console.log(response.data);
        } catch (error) {
          console.error(error.response.data.message);
        }
      };


  return (
    <div>
        <div>
            <form className="main-form" onSubmit={handleSubmit}>
                <h1>Signup</h1>
                <div className="form-container">
                <input type="username" className="form-control" placeholder="add a username" onChange={(e)=>setUsername(e.target.value)} />
                <input type="email" className="form-control" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" className="form-control" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Signup</button>
                </div>  
                </form>
        </div>
    </div>
  );
};

export default Register