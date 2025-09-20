// import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// export default function MyOrder() {
//   const [orderData, setOrderData] = useState(null);

//   // Example: Fetch order data (you can replace with your API call)
//   useEffect(() => {
//     async function fetchOrders() {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/api/my-order-data",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email: localStorage.getItem("userEmail") }),
//           }
//         );
//         const result = await response.json();
//         setOrderData(result);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     }
//     fetchOrders();
//   }, []);

//   return (
//     <div>
//       <Header />
//       <div className="container py-3">
//         <div className="row">
//           {!orderData || !orderData.orderData ? (
//             <p className="text-center">No orders found.</p>
//           ) : (
//             orderData.orderData.order_data
//               .slice(0)
//               .reverse()
//               .map((order, index) => (
//                 <div key={index} className="w-100">
//                   <div className="m-auto mt-4 text-center">
//                     <h5>{order[0]?.Order_date || "Unknown Date"}</h5>
//                     <hr />
//                   </div>

//                   <div className="row">
//                     {order.slice(1).map((item, idx) => (
//                       <div
//                         key={idx}
//                         className="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
//                         <div
//                           className="card mt-3 shadow-sm"
//                           style={{ width: "16rem", maxHeight: "360px" }}>
//                           <div className="card-body">
//                             <h5 className="card-title">{item.name}</h5>
//                             <div className="d-flex flex-wrap justify-content-between">
//                               <span>{item.size}</span>
//                               <span>Qty: {item.quantity}</span>
//                               <span className="fw-bold">₹{item.price}/-</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/my-order-data",
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
                    {order[0]?.Order_date || "Unknown Date"}
                  </h5>
                  <hr />
                </div>

                {/* Order Items */}
                <div className="row g-3">
                  {order.slice(1).map((item, idx) => (
                    <div
                      key={idx}
                      className="col-12 col-md-6 col-lg-3 d-flex justify-content-center"
                    >
                      <div className="card shadow-sm h-100" style={{ width: "16rem" }}>
                        {item.img ? (
                          <img
                            src={item.img}
                            className="card-img-top"
                            alt={item.name}
                            style={{ maxHeight: "180px", objectFit: "cover" }}
                          />
                        ) : (
                          <div
                            className="card-img-top bg-secondary d-flex align-items-center justify-content-center text-white"
                            style={{ height: "180px" }}
                          >
                            No Image
                          </div>
                        )}
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{item.name}</h5>
                          <div className="mt-auto">
                            <p className="mb-1">
                              <strong>Size:</strong> {item.size}
                            </p>
                            <p className="mb-1">
                              <strong>Qty:</strong> {item.quantity}
                            </p>
                            <p className="mb-0 fw-bold">₹{item.price}/-</p>
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
