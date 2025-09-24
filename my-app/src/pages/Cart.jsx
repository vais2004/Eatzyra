// import React from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { useCart, useDispatchCart } from "../components/ContextReducer";

// export default function Cart() {
//   const data = useCart();
//   const dispatch = useDispatchCart();

//   const totalPrice = data.reduce((total, food) => total + food.price, 0);

//   const handleCheckOut = async () => {
//     const userEmail = localStorage.getItem("userEmail");
//     if (!userEmail) return alert("Please log in to complete your order");
//     if (data.length === 0) return alert("Your cart is empty");

//     try {
//       const response = await fetch(
//         "https://eatzyra-backend.vercel.app/api/order-data",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             order_data: data,
//             email: userEmail,
//             order_date: new Date().toISOString(),
//           }),
//         }
//       );

//       const responseData = await response.json();
//       console.log("Order Response:", responseData);

//       if (response.status === 200) dispatch({ type: "DROP" });
//     } catch (error) {
//       console.error("Checkout error:", error);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="container my-5">
//         {data.length === 0 ? (
//           <p className="text-center fs-5 my-5">Your cart is empty! 🛒</p>
//         ) : (
//           <>
//             {/* Responsive Table */}
//             <div className="table-responsive">
//               <table className="table table-hover align-middle text-center">
//                 <thead className="text-success fs-6">
//                   <tr>
//                     <th>#</th>
//                     <th>Image</th>
//                     <th>Name</th>
//                     <th>Quantity</th>
//                     <th>Option</th>
//                     <th>Amount</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data.map((food, index) => (
//                     <tr key={`${food.id}-${index}`}>
//                       <th scope="row">{index + 1}</th>
//                       <td>
//                         <img
//                           src={food.img}
//                           alt={food.name}
//                           className="img-fluid rounded"
//                           style={{
//                             maxHeight: "50px",
//                             width: "70px",
//                             objectFit: "cover",
//                             border: "1px solid #ccc",
//                           }}
//                         />
//                       </td>
//                       <td>{food.name}</td>
//                       <td>{food.quantity}</td>
//                       <td>{food.size}</td>
//                       <td>₹{food.price}</td>
//                       <td>
//                         <button
//                           type="button"
//                           className="btn btn-danger btn-sm"
//                           onClick={() => dispatch({ type: "REMOVE", index })}
//                         >
//                           <i className="bi bi-trash"></i>
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Total and Checkout Button */}
//             <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-3">
//               <p className="fs-5 mb-0">Total Price: ₹{totalPrice}</p>
//               <button
//                 className="btn btn-outline-success w-100 w-md-auto"
//                 onClick={handleCheckOut}
//               >
//                 Check Out
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// }

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
  const data = useCart();
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
    paymentMethod: "",
  });

  const totalPrice = data.reduce((total, food) => total + food.price, 0);
  const discount = totalPrice > 500 ? totalPrice * 0.1 : 0; // 10% discount if >500
  const finalPrice = totalPrice - discount;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleCheckOut = async (e) => {
  e.preventDefault();
  const userEmail = localStorage.getItem("userEmail");
  if (!userEmail) return alert("Please log in to complete your order");
  if (data.length === 0) return alert("Your cart is empty");

  try {
    const response = await fetch(
      "https://eatzyra-backend.vercel.app/api/order-data",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toISOString(),
          address: formData,
          final_price: finalPrice,
          paymentMethod: formData.paymentMethod // Added this line
        }),
      }
    );

    const responseData = await response.json();
    console.log("Order Response:", responseData);

    if (response.status === 200) {
      alert("🎉 Order placed successfully!");
      dispatch({ type: "DROP" });
    }
  } catch (error) {
    console.error("Checkout error:", error);
  }
};

  return (
    <>
      <Header />
      <div className="container my-5">
        {data.length === 0 ? (
          <p className="text-center fs-5 my-5">Your cart is empty! 🛒</p>
        ) : (
          <div className="row">
            {/* Cart Table */}
            <div className="col-md-8">
              <div className="table-responsive">
                <table className="table table-hover align-middle text-center">
                  <thead className="text-success fs-6">
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Option</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((food, index) => (
                      <tr key={`${food.id}-${index}`}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <img
                            src={food.img}
                            alt={food.name}
                            className="img-fluid rounded"
                            style={{
                              maxHeight: "50px",
                              width: "70px",
                              objectFit: "cover",
                              border: "1px solid #ccc",
                            }}
                          />
                        </td>
                        <td>{food.name}</td>
                        <td>{food.quantity}</td>
                        <td>{food.size}</td>
                        <td>₹{food.price}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => dispatch({ type: "REMOVE", index })}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Summary + Address */}
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5 className="mb-3">Order Summary</h5>
                <p>Total Items Price: ₹{totalPrice}</p>
                <p>Discount: -₹{discount.toFixed(2)}</p>
                <h6 className="fw-bold">Final Price: ₹{finalPrice.toFixed(2)}</h6>
                {discount > 0 && (
                  <p className="text-success">You saved ₹{discount.toFixed(2)} 🎉</p>
                )}
              </div>

              <div className="card shadow-sm p-3 mt-3">
                <h5 className="mb-3">Delivery Address</h5>
                <form onSubmit={handleCheckOut}>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-control mb-2"
                    required
                  />
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="form-control mb-2"
                    required
                  />
                  <input
                    type="text"
                    name="house"
                    placeholder="Flat, House No., Building"
                    value={formData.house}
                    onChange={handleChange}
                    className="form-control mb-2"
                    required
                  />
                  <input
                    type="text"
                    name="area"
                    placeholder="Area, Street"
                    value={formData.area}
                    onChange={handleChange}
                    className="form-control mb-2"
                    required
                  />
                  <input
                    type="text"
                    name="town"
                    placeholder="Town/City"
                    value={formData.town}
                    onChange={handleChange}
                    className="form-control mb-2"
                    required
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="form-control mb-2"
                    required
                  />

                  <div className="form-check mb-2">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                    <label className="form-check-label">
                      Make this my default address
                    </label>
                  </div>

                  <h6 className="mt-3">Payment Method</h6>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === "COD"}
                      onChange={handleChange}
                      className="form-check-input"
                      required
                    />
                    <label className="form-check-label">Cash on Delivery</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI"
                      checked={formData.paymentMethod === "UPI"}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                    <label className="form-check-label">UPI</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Card"
                      checked={formData.paymentMethod === "Card"}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                    <label className="form-check-label">Credit/Debit Card</label>
                  </div>

                  <button
                    className="btn btn-success w-100 mt-3"
                    type="submit"
                  >
                    Place Order
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
