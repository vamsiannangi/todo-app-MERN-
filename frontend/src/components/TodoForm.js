import React, { useContext, useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
import { store } from '../App';
import { useNavigate, useParams } from 'react-router-dom';

const TodoForm = () => {
  const [token] = useContext(store);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id && token) {
      axios.get(`http://localhost:2000/api/v1/todos/${id}`, {
        headers: {
          'x-token': token,
        }
      }).then(res => {
        setTitle(res.data.title);
        setBody(res.data.body);
      }).catch((error) => console.log(error));
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:2000/api/v1/todos/${id}`, { title, body }, {
        headers: {
          'x-token': token,
        }
      });
    } else {
      await axios.post('http://localhost:2000/api/v1/todos/addTodo', { title, body }, {
        headers: {
          'x-token': token,
        }
      });
    }
    navigate('/TodoList');
  }

  return (
    <div className="todo-form-container">
      <form className="todo-form" onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" className="form-control" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Body</label>
          <textarea className="form-control" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} required></textarea>
        </div>
        <button type="submit">{id ? 'Update Todo' : 'Create Todo'}</button>
      </form>
    </div>
  );
};

export default TodoForm;
