import React, { useState, useEffect } from 'react';
import formatDate from '../backend/date.js';
import './Feed.css';

function Feed({ refresh, userId }) {
  const [posts, setPosts] = useState([]);

    useEffect(() => {
    const fetchPosts = async () => {
      let url = "http://localhost:5000/posts";
      if (userId) url += `?userId=${userId}`;
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, [refresh, userId]);

  const handleLike = async (post) => {
    await fetch(`http://localhost:5000/posts/${post.id}/like`, { method: 'POST' });
    setPosts(posts.map(p => p.id === post.id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleComment = async (post) => {
    await fetch(`http://localhost:5000/posts/${post.id}/comment`, { method: 'POST' });
    setPosts(posts.map(p => p.id === post.id ? { ...p, comments: p.comments + 1 } : p));
  };

  return (
    <div className='post_section'>
      {posts.map((post) => (
        <div key={post.id} className="post_container">
          <p className="post_username">
            {post.User.username} • {formatDate(post.createdAt)}
          </p>
          <p className="post_message">{post.message}</p>
          <div className="post_components">
            <span>{post.comments}</span>
            <button className="post_button" onClick={() => handleComment(post)}>💬</button>
            <span>{post.likes}</span>
            <button className="post_button" onClick={() => handleLike(post)}>❤️</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;
