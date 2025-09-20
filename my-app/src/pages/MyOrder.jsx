import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);

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
        const result = await response.json();
        setOrderData(result);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div>
      <Header />
      <div className="container py-4">
        <h2 className="text-center mb-4">My Orders</h2>

        {!orderData || !orderData.orderData ? (
          <p className="text-center fs-5">No orders found.</p>
        ) : (
          orderData.orderData.order_data
            .slice(0)
            .reverse()
            .map((order, index) => (
              <div key={index} className="mb-5">
                {/* Order Date */}
                <div className="text-center mb-3">
                  <h5 className="bg-light p-2 rounded">
                    {order[0]?.Order_date
                      ? new Date(order[0].Order_date).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "Unknown Date"}
                  </h5>
                  <hr />
                </div>

                {/* Order Items */}
                <div className="row g-3">
                  {order.slice(1).map((item, idx) => (
                    <div
                      key={idx}
                      className="col-12 col-md-6 col-lg-4 d-flex justify-content-center"
                    >
                      <div className="card mb-3 shadow-sm w-100">
                        <div className="row g-0">
                          {/* Image Section */}
                          <div className="col-4 col-md-4">
                            {item.img ? (
                              <img
                                src={item.img}
                                alt={item.name}
                                className="img-fluid rounded-start"
                                style={{ maxHeight: "150px", objectFit: "cover" }}
                              />
                            ) : (
                              <div
                                className="bg-secondary text-white d-flex align-items-center justify-content-center rounded-start"
                                style={{ height: "150px" }}
                              >
                                No Image
                              </div>
                            )}
                          </div>

                          {/* Details Section */}
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
              </div>
            ))
        )}
      </div>
      <Footer />
    </div>
  );
}
