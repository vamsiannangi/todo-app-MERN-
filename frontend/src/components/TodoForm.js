import React, { useContext, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { store } from '../App';
import { useNavigate } from 'react-router-dom';

const TodoForm = () => {
  const [token] = useContext(store);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:2000/api/v1/todos/addTodo',
        { title, body },
        {
          headers: {
            'x-token': token,
          },
        }
      );
      if (response.status === 200) {
        navigate('/TodoList');
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div className="todo-form-container">
      <h2>Create Todo</h2>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Body</label>
          <textarea
            className="form-control"
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default TodoForm;

// import React, { useContext, useState } from 'react';
// import './styles.css';
// import axios from 'axios';
// import { store } from '../App';
// import { useNavigate } from 'react-router-dom';

// const TodoForm = () => {
//   const [token] = useContext(store);
//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     navigate('/TodoList');
//     try {
    
//       const response = await axios.post(
//         'http://localhost:2000/api/v1/todos/addTodo',
//         { title, body },
//         {
//           headers: {
//             'x-token': token,
//           },
//         }
//       );
//       // if (response.status === 200) {
//       //   // Navigate to the todo list page after successful submission
//       //   navigate('/TodoList');
//       // }
      
//     } catch (error) {
//       console.error('Error adding todo:', error);
//     }
//   };

//   return (
//     <div className="todo-form-container">
//       <h2>Create Todo</h2>
//       <form className="todo-form" onSubmit={handleSubmit}>
//         <div>
//           <label>Title</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Body</label>
//           <textarea
//             className="form-control"
//             placeholder="Body"
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             required
//           ></textarea>
//         </div>
//         <button type="submit">Add Todo</button>
//       </form>
//     </div>
//   );
// };

// export default TodoForm;
