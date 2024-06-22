import React, { useState, useEffect } from "react";
import Navbar from "./assets/Navbar";
import "./home.css";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const getToken = sessionStorage.getItem("accessToken");

  //On page refresh or load, automatically checks for token to ensure its a valid user
  useEffect(() => {
    if (getToken && getToken != "" && getToken != undefined) {
      setIsLoggedIn(true);
      getUser();
    }
  }, []);

  const getUser = async () => {
    const options = {
      headers: {
        method: "GET",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    };
    try {
      const response = await fetch("http://127.0.0.1:5000/get-user", options);

      if (!response.ok) {
        // Handle non-200 responses
        const errorData = await response.json();
        console.error("Error:", errorData.message);
      } else {
        const data = await response.json();
        console.log("Success:", data.user);
        setUser(data.user)
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Network error:", error);
    }
  };

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
