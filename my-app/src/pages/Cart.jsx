import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckOut = async () => {
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
          }),
        }
      );

      const responseData = await response.json();
      console.log("Order Response:", responseData);

      if (response.status === 200) dispatch({ type: "DROP" });
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
          <>
            {/* Responsive Table */}
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

            {/* Total and Checkout Button */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-3">
              <p className="fs-5 mb-0">Total Price: ₹{totalPrice}</p>
              <button
                className="btn btn-outline-success w-100 w-md-auto"
                onClick={handleCheckOut}
              >
                Check Out
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
