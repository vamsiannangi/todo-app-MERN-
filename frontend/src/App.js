import React, { createContext, useState, useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

export const store = createContext();

const PrivateRoute = ({ element }) => {
  const [token] = useContext(store);
  return token ? element : <Navigate to="/" />;
};

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <store.Provider value={[token, setToken]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-todo" element={<PrivateRoute element={<TodoForm />} />} />
          <Route path="/TodoList" element={<PrivateRoute element={<TodoList />} />} />
        </Routes>
      </BrowserRouter>
    </store.Provider>
  );
};

export default App;
