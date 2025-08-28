import "./profile.css";
import { useOutletContext } from "react-router-dom";
import defaultImg from "./assets/Default.jpg";
import React, { useEffect, useState } from 'react';
import Feed from "./Feed.jsx";

function Profile(){

const { user } = useOutletContext();
// Button active class
  useEffect(() => {
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
      });
    });

    // Cleanup event listeners on unmount
    return () => {
      buttons.forEach((button) =>
        button.removeEventListener("click", () => {})
      );
    };
  }, []);

return (
  <>
    <div className="profile_order">
      <div className="profile_main_cont">
        <div className="profile_header">
            <p className="profile_header_text">
            <img src={defaultImg} className='profile_picture'></img>
            {user?.username || "Guest"}
            </p>
          <div className="statistics">
            <p>Posts:0</p>
            <p>Followers:0</p>
            <p>Following:0</p>
          </div>
        </div>
        <div className="profile_main">
          <div className="main_buttons">
            <button className="btn active">Your posts</button>
            <button className="btn">Following</button>
          </div>
          <div className="posts">
            <Feed refresh={false} userId={user?.id}/>
          </div>
        </div>
      </div>
      <div className="search_profile"></div>
    </div>
  </>
)
}

export default Profile;