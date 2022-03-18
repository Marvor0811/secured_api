import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Users from './components/Users/Users'
import Register from './components/Register/Register'
import './App.css';
import useToken from './useToken';

function App() {     
  const { token, setToken } = useToken();
  
  if(!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} /> }/>
          <Route path="/register" element ={<Register />}/>
        </Routes>
      </BrowserRouter>
      );
  }
  
  return(
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/users" element={<Users />}/> 
          <Route path="/register" element ={<Register />}/>
          <Route path="/login" element={
          <div>
            <h1>Successfully logged in, go to route /users to access API</h1>
            <Login setToken={setToken} /> 
          </div>}/>
        </Routes>
      </BrowserRouter>
    </div>
  ); 
}

export default App;
