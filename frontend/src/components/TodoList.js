// import React, { useContext, useState, useEffect } from 'react';
// import './styles.css';
// import { store } from '../App';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { Redirect } from 'react-router-dom';

// const TodoList = () => {
//   const [token, setToken] = useContext(store);
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     if (token) {
//       axios.get('http://localhost:2000/api/v1/todos/myList', {
//         headers: {
//           'x-token': token,
//         }
//       }).then(res => setData(res.data))
//         .catch((error) => console.log(error));
//     }
//   }, [token]);

  

//   return (
//     <div className="todo-list-container">
//       {
//         data && data.userName && <h1>{data.userName}</h1>
//       }
//       <h2>Todo List</h2>
//       <button className="create-todo-button">
//         <Link to="/create-todo">Create New Todo</Link>
//       </button>
//       <div className="todos">
//         {data && data.list && data.list.map((todo) => (
//           <div key={todo.id} className="todo-card">
//             <h3>{todo.title}</h3>
//             <p>{todo.body}</p>
//             <button className="edit-todo-button">
//               {/* <Link to={`/edit-todo/${todo.id}`}>Edit</Link> */}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TodoList;



import React, { useContext, useState, useEffect } from 'react';
import './styles.css';
import { store } from '../App';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TodoList = () => {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:2000/api/v1/todos/myList', {
        headers: {
          'x-token': token,
        }
      }).then(res => setData(res.data))
        .catch((error) => console.log(error));
    }
  }, [token]);
  if (!token) {
    return <Redirect to='/' />
  }
  return (
    <div className="todo-list-container">
      {
        data && data.userName && <h1>{`Welcome, ${data.userName}`}</h1>
      }
      <h2>Todo List</h2>
      <button className="create-todo-button">
               <Link to="/create-todo">Create New Todo</Link>
      </button>
      <div className="todos">
        {data && data.list && data.list.map((todo) => (
          <div key={todo.id} className="todo-card">
            <h3>{todo.title}</h3>
            <p>{todo.body}</p>
            <button className="edit-todo-button">
              <Link to={`/TodoForm/${todo.id}`}>Edit</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
