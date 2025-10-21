import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  const quotes = [
    "🛒✨ Your cart is empty… let’s fill it with yummy food! 🍔🍕🍝",
    "🍔🥗🍕 Delicious meals are waiting… add them to your cart! 😋",
    "😋🍴 An empty cart is a sad cart… let’s fix that! 🥘",
    "🚀🍛 Good food = good mood… start ordering now! ❤️",
    "🌮🍟🍩Happiness is just a meal away. Add something tasty!",
    "🥳🍽️ Don’t keep your stomach waiting… order your favorite dish! 🍲",
    "🍕❤️ Your taste buds deserve some love… feed your cart!",
    "🌯🍝 Empty cart, full dreams… let’s make them delicious! 😋",
    "🥗🍔 Food is happiness… start adding your favorite meals! 🥳",
    "🍛💛 Life is short, eat good food… fill your cart now! 🛒",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const cart = useCart();
  const dispatch = useDispatchCart();
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    house: "",
    area: "",
    town: "",
    pincode: "",
    state: "",
    isDefault: false,
    paymentMethod: "COD",
  });
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const userEmail = localStorage.getItem("userEmail");

  //fetching saved addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!userEmail) return;
      try {
        const res = await fetch(
          "https://eatzyra-backend.vercel.app/api/get-addresses",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userEmail }),
          }
        );
        const data = await res.json();
        if (data.success) {
          setSavedAddresses(data.addresses);
        } else {
          setSavedAddresses([]);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setSavedAddresses([]);
      }
    };
    fetchAddresses();
  }, [userEmail]);

  //handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  //save address
  const handleSaveAddress = async () => {
    if (!userEmail) {
      toast.error("Please login first.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        "https://eatzyra-backend.vercel.app/api/add-address",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, userEmail }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Address saved successfully!");
        setSavedAddresses([...savedAddresses, data.address]);
        setFormData({
          fullName: "",
          mobile: "",
          house: "",
          area: "",
          town: "",
          pincode: "",
          state: "",
          isDefault: false,
          paymentMethod: "COD",
        });
      } else {
        toast.error(data.error || "Failed to save address.");
      }
    } catch (err) {
      toast.error("Error saving address.");
    }
    setLoading(false);
  };

  //delete address
  const deleteAddress = async (id) => {
    try {
      const res = await fetch(
        `https://eatzyra-backend.vercel.app/api/delete-address/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Address deleted!");
        setSavedAddresses(savedAddresses.filter((a) => a._id !== id));
      } else {
        toast.error(data.error || "Failed to delete address.");
      }
    } catch (error) {
      toast.error("Error deleting address.");
    }
  };

  //select saved address
  const selectAddress = (address) => {
    setFormData({
      fullName: address.fullName,
      mobile: address.mobile,
      house: address.house,
      area: address.area,
      town: address.town,
      pincode: address.pincode,
      state: address.state,
      isDefault: address.isDefault,
      paymentMethod: formData.paymentMethod,
    });
    toast.success("Using saved address!");
  };

  //place order
  const handleCheckout = async () => {
    if (cart.length === 0) return toast.error("Your cart is empty!");

    const orderData = {
      order_data: cart,
      email: userEmail,
      order_date: new Date().toLocaleString(),
      address: formData,
      final_price: totalPrice(),
      paymentMethod: formData.paymentMethod,
    };

    try {
      const res = await fetch(
        "https://eatzyra-backend.vercel.app/api/order-data",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Order placed successfully!");
        dispatch({ type: "DROP" });
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      toast.error("Error placing order.");
    }
  };

  //calculate total price
  const totalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <>
      <Header />
      <div className="container mt-5 mb-5">
        <ToastContainer />

        <h2 className="text-center mb-4">🛒 My Cart</h2>

        {/* cart items */}
        {cart.length === 0 ? (
          <div className="text-center">
            <h5>Your cart is empty!</h5>
            <p className="mb-3 text-muted">{randomQuote}</p>
            <Link to="/" className="col-3 btn btn-outline-primary mt-3">
              Order Yummy Food 🍴
            </Link>
          </div>
        ) : (
          <>
            <table className="table table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.size}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => dispatch({ type: "REMOVE", index })}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h5 className="text-end">Total Price: ₹{totalPrice()}</h5>

            {/* saved addresses */}
            <div className="card shadow-sm p-3 mt-4 mb-4">
              <h5 className="mb-3">Saved Addresses</h5>
              {savedAddresses.length === 0 ? (
                <p>No saved addresses found.</p>
              ) : (
                savedAddresses.map((address) => (
                  <div
                    key={address._id}
                    className={`border p-2 mb-2 rounded ${
                      address.isDefault ? "border-success" : "border-secondary"
                    }`}>
                    <p className="mb-1">
                      <strong>{address.fullName}</strong>{" "}
                      {address.isDefault && "(Default)"}
                    </p>
                    <p className="mb-1">
                      {address.house}, {address.area}, {address.town},{" "}
                      {address.state} - {address.pincode}
                    </p>
                    <p className="mb-1">📱 {address.mobile}</p>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => selectAddress(address)}>
                        Use This Address
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteAddress(address._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* address form */}
            <div className="card shadow-sm p-3">
              <h5>Add / Edit Address</h5>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    name="house"
                    placeholder="House / Flat / Building"
                    value={formData.house}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    name="area"
                    placeholder="Area / Street"
                    value={formData.area}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    name="town"
                    placeholder="Town / City"
                    value={formData.town}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-check-label">
                    <input
                      type="checkbox"
                      name="isDefault"
                      className="form-check-input me-2"
                      checked={formData.isDefault}
                      onChange={handleChange}
                    />
                    Set as Default
                  </label>
                </div>
              </div>
              <button
                className="btn btn-success"
                onClick={handleSaveAddress}
                disabled={loading}>
                {loading ? "Saving..." : "Save Address"}
              </button>
            </div>

            {/* checkout button */}
            <div className="text-end mt-4">
              <button className="btn btn-primary" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
