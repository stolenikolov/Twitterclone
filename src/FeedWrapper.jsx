import React, { useState } from 'react';
import Feed from './Feed';

function FeedWrapper({ user }) {
  const [refreshFeed, setRefreshFeed] = useState(0);
  const [message, setMessage] = useState("");

  const handlePost = async () => {
    if (!message) return;
    await fetch("http://localhost:5000/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, userId: user.id }),
    });
    setMessage(""); // Clear textarea
    setRefreshFeed(prev => prev + 1); // Trigger feed refresh
  };

  return (
    <>
    <div className='search_input_container'>
    <div className='feed_input_container'>
      <div className="input_container">
        <textarea
          placeholder="What are you thinking?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input_text"
          />
        <button className="input_button" onClick={handlePost}>
          Post
        </button>
      </div>
      <Feed user={user} refresh={refreshFeed} />
    </div>
    <div className='search_container'>
      <input type="text" placeholder='Search' className='search_input'/>
    </div>
    </div>
  </>
  );
}
export default FeedWrapper;