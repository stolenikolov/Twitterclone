import "./login.css";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Dashboard from "./Dashboard";
function Login({setUser}) {

  const[username,setUsername] = useState('');
  const[password,setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // This is where you call your server
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
      setUser(data.user);
      navigate('/dashboard')
    } else {
      console.log(data.message); // invalid credentials
    }
  };
  return (
    <div className="login_screen">
    <div className="box_color_cont">
      <div className="login_box">
        <h1>Login</h1>
        <div className="login_input">
          <input type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)}/>
          <input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <button onClick={handleLogin}>Login</button>
        <div className="fixQuestion">
        <p className="Question">Dont have a an account?</p>
        <p className="link"><Link to="/register">Register a new account</Link></p>
        </div>
      </div>
      <div className = "login_color">
        <h1 className="color_text">Connect.</h1>
        <h1 className="color_text">Share.</h1>
        <h1 className="color_text">Discover.</h1>
      </div>
        </div>
    </div>
  );
}

export default Login;
