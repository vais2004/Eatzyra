import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);
  const [currentTime, setCurrentTime] = useState(Date.now()); // helps auto update

  // Fetch user orders
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(
          "https://eatzyra-backend.vercel.app/api/my-order-data",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: localStorage.getItem("userEmail") }),
          }
        );

        if (!response.ok) {
          console.error("Server returned error:", response.statusText);
          setOrderData([]);
          return;
        }

        const result = await response.json();
        if (result.success) {
          setOrderData(result.orders || []);
        } else {
          setOrderData([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrderData([]);
      }
    }

    fetchOrders();
  }, []);

  // This function decides what status to show based on time passed
  function getOrderStatus(orderDate) {
    const now = new Date();
    const placedTime = new Date(orderDate);
    const minutesPassed = Math.floor((now - placedTime) / (1000 * 60));

    if (minutesPassed < 1) return "Pending"; // first 1 minute
    if (minutesPassed < 20) return "Confirmed"; // next 19 minutes
    if (minutesPassed < 30) return "Out for Delivery"; // next 10 minutes
    return "Delivered"; // after 30 minutes
  }

  // This useEffect runs every 30 seconds to update status automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 30000); // update every 30 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Header />
      <main className="container py-4">
        <h2 className="text-center mb-4">My Orders</h2>

        {orderData.length === 0 ? (
          <p className="text-center fs-5">No orders found.</p>
        ) : (
          orderData.map((order, index) => {
            const orderStatus = getOrderStatus(order.order_date);

            return (
              <div key={index} className="mb-5 border p-3 rounded">
                <div className="text-center mb-3">
                  <h5 className="bg-light p-2 rounded">
                    Order Date:{" "}
                    {new Date(order.order_date).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </h5>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      style={{
                        color:
                          orderStatus === "Pending"
                            ? "orange"
                            : orderStatus === "Confirmed"
                            ? "blue"
                            : orderStatus === "Out for Delivery"
                            ? "purple"
                            : "green",
                      }}>
                      {orderStatus}
                    </span>
                  </p>

                  <p>
                    <strong>Total:</strong> ₹{order.final_price}
                  </p>
                  <p>
                    <strong>Payment Method:</strong> {order.paymentMethod}
                  </p>
                  <hr />
                </div>

                <div className="row g-3">
                  {order.order_data.map((item, idx) => (
                    <div
                      key={idx}
                      className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
                      <div className="card mb-3 shadow-sm w-100">
                        <div className="row g-0">
                          <div className="col-4 col-md-4">
                            {item.img ? (
                              <img
                                src={item.img}
                                alt={item.name}
                                className="img-fluid rounded-start"
                                style={{
                                  maxHeight: "150px",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <div
                                className="bg-secondary text-white d-flex align-items-center justify-content-center rounded-start"
                                style={{ height: "150px" }}>
                                No Image
                              </div>
                            )}
                          </div>

                          <div className="col-8 col-md-8">
                            <div className="card-body">
                              <h5 className="card-title">{item.name}</h5>
                              <p className="card-text mb-1">
                                <strong>Size:</strong> {item.size}
                              </p>
                              <p className="card-text mb-1">
                                <strong>Qty:</strong> {item.quantity}
                              </p>
                              <p className="card-text fw-bold mb-0">
                                ₹{item.price}/-
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 p-3 bg-light rounded">
                  <h6>Delivery Address:</h6>
                  <p className="mb-1">{order.address?.fullName}</p>
                  <p className="mb-1">
                    {order.address?.house}, {order.address?.area}
                  </p>
                  <p className="mb-1">
                    {order.address?.town}, {order.address?.state} -{" "}
                    {order.address?.pincode}
                  </p>
                  <p className="mb-0">Phone: {order.address?.mobile}</p>
                </div>
              </div>
            );
          })
        )}
      </main>
      <Footer />
    </>
  );
}
