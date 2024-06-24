import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function NotesPage() {
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
      method: "GET",
      credentials: 'include',
      //headers: {
        //'X-CSRF-TOKEN': getCookie('csrf_access_token'),
      //},
    };
    const response = await fetch("http://127.0.0.1:5000/get-user", options);
    if (response.status !== 201 && response.status!== 200) {
      const errorData = await response.json();
      alert(errorData.message)
    } 
    else {
      const respData = await response.json();
      setUser(respData.user)
    }
  };

  return (
    <>
      <Navbar></Navbar>
      {isLoggedIn ? (<><h1> hi welcome user: {user} <br></br> {sessionStorage.getItem("accessToken")}
        <br></br> Notes Page
      </h1>
      </>) : (<></>)}
    </>
  );
}

export default NotesPage;
