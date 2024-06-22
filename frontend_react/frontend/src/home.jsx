import React, { useState, useEffect } from "react";
import Navbar from "./assets/Navbar";
import "./main.css";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getToken = sessionStorage.getItem("accessToken");

  //On page refresh or load, automatically checks for token to ensure its a valid user
  useEffect(() => {
    if (getToken && getToken != "" && getToken != undefined) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Navbar></Navbar>
      {isLoggedIn ? (<><h1> hi welcome user: {user}
        <br></br> Welcome to put anything here for authorized users.
      </h1>
      </>) : (<></>)}
    </>
  );
}

export default Home;
