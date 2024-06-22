import React, { useState, useEffect } from "react";
import SignupForm from "./signupForm";
import LoginPage from "./login";

function Navbar({}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (getToken && getToken != "" && getToken != undefined) {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle logout
  const logout = async () => {
    sessionStorage.removeItem("accessToken");
    console.log("Logging out");
    window.location.href = "http://localhost:3000/login";
    setIsLoggedIn(false);
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
                    href="/passwords"
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
