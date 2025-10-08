import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function SignUp() {
   const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://eatzyra-backend.vercel.app/api/createuser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.ok && result.success) {
        toast.success("🎉 Signup Successful! Welcome aboard.");
        setData({ name: "", email: "", password: "", location: "" });
      } else {
        toast.error(
          result.message ||
            result.error ||
            "⚠️ This email is already registered. Try another one."
        );
      }
    } catch (error) {
      toast.error("⚠️ Server error. Please try again later.");
      console.error(error);
    }
  };


  return (
    <main
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}>
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
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
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              id="password"
              name="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              id="confirmPassword"
              value={data.password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
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
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign Up
          </button>
          <div className="text-center">
            <span>Already have an account? </span>
            <Link to="/login">Login here</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
