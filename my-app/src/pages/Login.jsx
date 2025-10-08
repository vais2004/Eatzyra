import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  let navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://eatzyra-backend.vercel.app/api/loginuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }
    );

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("authToken", result.authToken);
      console.log("Stored email:", data.email);
      toast.success("✅ Logged in successfully!");

      setData({ email: "", password: "" });
      setTimeout(() => navigate("/"), 3000);
    } else {
      toast.error(result.error || "❌ Invalid email or password");
    }
  };

  return (
    <main
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}>
      <ToastContainer position="top-right" className="mt-5" autoClose={3000} />

      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Login</h3>
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
              required
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
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 mb-3">
            Login
          </button>
          <div className="text-center">
            <span>New here? </span>
            <Link to="/signup">Create an account</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
