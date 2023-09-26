import { BrowserRouter, Routes, Route } from 'react-router-dom';

import React from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import CreateTask from './CreateTask';


function App() {
  return (
       <div>
      
      <BrowserRouter>
        <Routes>

            <Route path='/' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='create_task' element={<CreateTask />} />

        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;