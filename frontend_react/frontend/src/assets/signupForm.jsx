import { useState } from "react";
import Navbar from "./Navbar"

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      email,
      password1,
      password2,
    };
    const url = "http://127.0.0.1:5000/signup";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const errorData = await response.json();
      alert(errorData.message);
    } else {
      window.location.href="http://localhost:3000/login";
    }
  };
  
  return (
        <form onSubmit={onSubmit}>
        <div>
          <label className="modal-items" htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
        </div>
        <div>
          <label className="modal-items" htmlFor="email">Email Adress</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>
        <div>
          <label className="modal-items" htmlFor="password1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password1"
            name="password1"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            placeholder="Enter Password"
          />
        </div>
        <div>
          <label className="modal-items" htmlFor="password2">Password Confirmation</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Confirm Password"
          />
        </div>
        <br />

        <button type="submit" className="btn btn-primary">
          Signup
        </button>
        </form>
  );
};

export default SignupForm;
