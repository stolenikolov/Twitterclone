import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    setMessage("");
    const data = await res.json();
    console.log(data);
    setUsername("");
    setPassword("");
  };
  
  return (
    <div className="login_screen">
      <div className="box_color_cont"> 
        <div className="login_color">
          <h1 className="color_text">Post.</h1>
          <h1 className="color_text">React.</h1>
          <h1 className="color_text">Belong.</h1>
        </div>
        <div className="login_box">
          <h1>Sign up</h1>
          <div className="login_input">
            <input type="text" placeholder="Enter username" value = {username} onChange={(e)=> setUsername(e.target.value)}/>
            <input type="password" placeholder="Enter password" value = {password} onChange={(e)=> setPassword(e.target.value)}/>
          </div>
          <button onClick={handleRegister}>Sign up</button>
          <div className="fixQuestion">
            <p className="Question">Already have an account?</p>
            <p><Link to="/login">Log into your account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
