import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Feed from './Feed';
import FeedWrapper from './FeedWrapper';
import Settings from './Settings';
import Messages from './Messages';
function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} /> {/* pass setUser */}
        <Route path="/register" element={<Register />} />
        <Route 
        path="/dashboard/*" 
        element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
      >
         <Route index element={<FeedWrapper user={user}/>} />
         <Route path="profile" element={<Profile/>}/>
         <Route path="settings" element={<Settings/>}/>
         <Route path="messages" element={<Messages/>}/>
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
