import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './page/TodoList';
import Register from './page/Register';
import Login from './page/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TodoList />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
