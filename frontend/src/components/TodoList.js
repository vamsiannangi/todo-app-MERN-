import React, { useContext, useState, useEffect } from 'react';
import './styles.css';
import { store } from '../App';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';

const TodoList = () => {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:2000/api/v1/todos/myList', {
        headers: {
          'x-token': token,
        }
      })
      .then(res => setData(res.data))
      .catch((error) => console.log(error));
    }
  }, [token]);

  if (!token) {
    return <Navigate to='/' />;
  }

  const handleLogout = () => {
    setToken(null); 
  };

  const handleDeleteTodo = (id) => {
    if (token) {
      axios.delete(`http://localhost:2000/api/v1/todos/${id}`, {
        headers: {
          'x-token': token,
        }
      })
      .then(() => {
        setData(prevData => ({
          ...prevData,
          list: prevData.list.filter(todo => todo._id !== id)
        }));
      })
      .catch(error => console.log(error));
    }
  };

  const filteredTodos = data && data.list 
    ? data.list.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        todo.body.toLowerCase().includes(searchTerm.toLowerCase())
      ) 
    : [];

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="main-container">
      {data && data.userName && <h1>{`Welcome, ${data.userName}`}</h1>}
      <div className="top-bar">
        <br></br>
        <input 
          type="text" 
          placeholder="Search todos..." 
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="create-todo-button">
          <Link to="/create-todo">Create New Todo</Link>
        </button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      
      <div className="todo-list-container">
        <h2>Todo List</h2>
        <div className="todos">
          {currentTodos.map((todo) => (
            <div key={todo._id} className="todo-card">
              <h3>{todo.title}</h3>
              <p>{todo.body}</p>
              <button className="edit-todo-button">
                <Link to={`/update-todo/${todo._id}`}>Edit</Link>
              </button>
              <button className="delete-todo-button" onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      {filteredTodos.length > todosPerPage && (
        <Pagination
          todosPerPage={todosPerPage}
          totalTodos={filteredTodos.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default TodoList;
