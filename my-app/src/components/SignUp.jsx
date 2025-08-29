import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        location: data.location,
      }),
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      setData({ name: "", email: "", password: "", location: "" });
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
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

          <div className="mb-3">
            <label htmlFor="exampleInputLocation" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputLocation"
              name="location"
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-outline-success me-4">
            Submit
          </button>
          <Link to="/login" className="btn btn-outline-secondary">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
}
