import "./App.css";

import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./components/SignUp";
import { CartProvider } from "./components/ContextReducer";
import Cart from "./pages/Cart";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
        
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
