// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";


// export default function Login() {
//   let navigate = useNavigate();

//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:5000/api/loginuser", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: data.email,
//         password: data.password,
//       }),
//     });

//     const result = await response.json();
//     console.log(result);

//     if (response.ok) {
//       setData({ email: "", password: "" });
//     }
//     // if (response.ok) {
//     //   localStorage.setItem("userEmail",data.email);
//     //   localStorage.setItem("authToken", result.authToken);
//     //   console.log(localStorage.getItem("authToken"));
//     //   navigate("/");
//     // }
// if (response.ok) {
//   // Store the email from the form data before resetting
//   localStorage.setItem("userEmail", data.email);
//   localStorage.setItem("authToken", result.authToken);
//   console.log("Stored email:", data.email);
  
//   // Then reset the form
//   setData({ email: "", password: "" });
//   navigate("/");
// }
//   };
  
//   return (
//     <>
//       <div className="container">
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="exampleInputEmail1" className="form-label">
//               Email address
//             </label>
//             <input
//               type="email"
//               className="form-control"
//               id="exampleInputEmail1"
//               name="email"
//               value={data.email}
//               aria-describedby="emailHelp"
//               onChange={(e) => setData({ ...data, email: e.target.value })}
//             />
//             <div id="emailHelp" className="form-text">
//               We'll never share your email with anyone else.
//             </div>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="exampleInputPassword1" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="exampleInputPassword1"
//               name="password"
//               value={data.password}
//               onChange={(e) => setData({ ...data, password: e.target.value })}
//             />
//           </div>

//           <button type="submit" className="btn btn-outline-success me-4">
//             Submit
//           </button>
//           <Link to="/signup" className="btn btn-outline-secondary">
//             I'am a new user
//           </Link>
//         </form>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("authToken", result.authToken);
      console.log("Stored email:", data.email);

      setData({ email: "", password: "" });
      navigate("/");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
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
    </div>
  );
}
