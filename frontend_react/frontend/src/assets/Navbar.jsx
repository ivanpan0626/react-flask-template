import React, { useState, useEffect } from "react";
import SignupForm from "./signupForm";
import LoginPage from "./login";
import axios from 'axios';

function Navbar({}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getToken = sessionStorage.getItem("accessToken");
  const api = axios.create({
    baseURL: 'http://127.0.0.1:5000',  // Your Flask backend URL
    withCredentials: true,  // Include cookies in requests
  })

  useEffect(() => {
    if (getToken && getToken != "" && getToken != undefined) {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle logout
  const logout = async () => {
    onLogout();
    sessionStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  const onLogout = async (e) => {
    e.preventDefault();
    const response = await api.post('/logout');
    if (response.status !== 201 && response.status !== 200) {
      //alert(data.message);
    } else {
      window.location.href="http://localhost:3000/login";
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar">
            <div className="navbar-nav">
              {isLoggedIn ? (
                <>
                  <a className="nav-item nav-link" id="home" href="/">
                    Home
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="notes-page"
                    href="/notes"
                  >
                    Notes
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="tasks-page"
                    href="/tasks"
                  >
                    Tasks
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="key-page"
                    href="/keys"
                  >
                    Keys
                  </a>
                </>
              ) : (
                <>
                  <a className="nav-item nav-link" id="logo-page" href="/">
                    Home
                  </a>
                </>
              )}
            </div>
            <div className="navbar-nav ml-auto">
              {isLoggedIn ? (
                <button
                  className="nav-item btn btn-primary"
                  id="logout"
                  onClick={logout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    className="nav-item btn btn-primary"
                    id="signup"
                    onClick={openCreateModal}
                  >
                    Signup
                  </button>
                  <a className="nav-item nav-link" id="login" href="/login">
                    Login
                  </a>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>

      {isModalOpen && (
        <div className="loginModel">
          <div className="loginModel-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <SignupForm />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
