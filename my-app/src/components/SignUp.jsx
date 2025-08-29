import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {

const handleSubmit=()=>{
  
}

  return (
    <>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="btn btn-outline-success">
          Submit
        </button>
        <Link to='/login' className="btn btn-outline-secondary">Already a user</Link>
      </form>
      </div>
    </>
  );
}
