// import React, {  useContext, useState } from 'react';
// import "./Register.css";
// import axios from 'axios';
// // import TodoList from './TodoList';
// import { store } from '../App';


// function Login() {
//   const[token,setToken]=useContext(store);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   // const [setTodos]=useContext(<TodoList/>)
// const handleSubmit=async (e)=>{
//     e.preventDefault();
//     try {
//         const response = await axios.post('http://localhost:2000/api/v1/login', {email,password});
//         if (response.data && response.data.list) {
//           setTodos(response.data.list);
//           setToken(response.data.token);
//           navigate('/todo-list', { state: { userId: response.data.userId } });
//         } else {
//           console.error('Login failed');
//         }
//       } catch (error) {
//         console.log(error);
//       }
// }
//   return (
//     <div >
//         <div>
//             <form className="main-form" onSubmit={handleSubmit}>
//                 <h1>Login</h1>
//                 <div className="form-container">
//                 <input type="email" class="form-control" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
//                 <input type="password" class="form-control" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
//                 <button type="submit">Login</button>
//                 </div>  
//             </form>
//         </div>
//     </div>
//   );
// }

// export default Login;
import React, { useContext, useState } from 'react';
import "./Register.css";
import axios from 'axios';
import { store } from '../App';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [token, setToken] = useContext(store);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:2000/api/v1/login', { email, password });
      setToken(response.data.token);
      navigate('/TodoList'); // Navigate to the TodoList page after setting the token
    } catch (error) {
      if (error.response) {
        console.error('Backend returned status code', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  }

  return (
    <div>
      <div>
        <form className="main-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
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
