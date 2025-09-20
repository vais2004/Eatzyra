import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("Please log in to complete your order");
      return;
    }
    if (data.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      const response = await fetch(
        "https://eatzyra-backend.vercel.app/api/order-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_data: data,
            email: userEmail,
            order_date: new Date().toDateString(),
          }),
        }
      );

      const responseData = await response.json();
      console.log("Order Response:", responseData);

      if (response.status === 200) {
        dispatch({ type: "DROP" });
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        {data.length === 0 ? (
          <p className="text-center fs-4 my-5">Your cart is empty! 🛒</p>
        ) : (
          <>
            <table className="table table-hover">
              <thead className="text-success fs-4">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Option</th>
                  <th scope="col">Amount</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((food, index) => (
                  <tr key={`${food.id}-${index}`}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img
                        src={food.img}
                        style={{ maxHeight: "50px", width: "50px" }}
                      />
                    </td>
                    <td>{food.name}</td>
                    <td>{food.quantity}</td>
                    <td>{food.size}</td>
                    <td>{food.price}</td>
                    <td>
                      <button
                        type="button"
                        className="btn bg-danger text-light px-2 py-0"
                        onClick={() => {
                          dispatch({ type: "REMOVE", index: index });
                        }}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="fs-3">Total Price: ₹{totalPrice}</p>

            <button
              className="btn btn-outline-success mt-3 mb-5"
              onClick={handleCheckOut}>
              Check Out
            </button>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
