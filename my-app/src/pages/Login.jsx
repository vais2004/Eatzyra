import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jsx } from "react/jsx-runtime";

export default function Login() {
  let navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      setData({ email: "", password: "" });
    }
    if (response.ok) {
      localStorage.setItem("userEmail",data.email);
      localStorage.setItem("authToken", result.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };
  
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={data.email}
              aria-describedby="emailHelp"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-outline-success me-4">
            Submit
          </button>
          <Link to="/signup" className="btn btn-outline-secondary">
            I'am a new user
          </Link>
        </form>
      </div>
    </>
  );
}
