// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function FoodDetails() {
//   const { id } = useParams();
//   const [foodItem, setFoodItem] = useState(null);

//   useEffect(() => {
//     const fetchFoodItem = async () => {
//       try {
//         const response = await fetch(
//           `https://eatzyra-backend.vercel.app/api/food-data/${id}`
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setFoodItem(data);
//       } catch (err) {
//         console.error("Error fetching food item:", err);
//       }
//     };

//     fetchFoodItem();
//   }, [id]);

//   if (!foodItem) {
//     return <p className="text-center my-5">⏳ Loading food details...</p>;
//   }

//   return (
//     <div className="container my-5">
//       <div className="card  border-1 rounded-4">
//         <img
//           src={foodItem.img}
//           className="card-img-top rounded-top-4"
//           alt={foodItem.name}
//           style={{ maxHeight: "350px", objectFit: "cover" }}
//         />
//         <div className="card-body text-center">
         
//           <span
//             className="px-1"
//             style={{
//               border: "solid 3px green",
//               width: "30px",
//               height: "28px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}>
//             <span
//             alt={foodItem.foodType}
//               style={{
//                 display: "inline-block",
//                 width: "16px",
//                 height: "16px",
//                 backgroundColor: "green",
//                 borderRadius: "50%",
//               }}></span>
//           </span>

//           <span
//             className="px-1"
//             style={{
//               border: "solid 3px red",
//               width: "30px",
//               height: "28px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}>
//             <span
//             alt={foodItem.foodType}
//               style={{
//                 display: "inline-block",
//                 width: "16px",
//                 height: "16px",
//                 backgroundColor: "red",
//                 borderRadius: "50%",
//               }}></span>
//           </span>
//           <h6 className="text-muted">{foodItem.CategoryName}</h6>
//           <h2 className="card-title fw-bold">{foodItem.name}</h2>
//           <p className="card-text text-secondary">{foodItem.description}</p>
//           <div className="d-flex justify-content-center gap-3 my-3">
//             {foodItem.options.map((opt, index) => (
//               <div key={index} className="border rounded px-3 py-2 shadow-sm">
//                 <strong>Half:</strong> ₹{opt.half} | <strong>Full:</strong> ₹
//                 {opt.full}
//               </div>
//             ))}
//           </div>
//           <button className="btn btn-success px-4 py-2 rounded-pill">
//             🍴 Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FoodDetails() {
  const { id } = useParams();
  const [foodItem, setFoodItem] = useState(null);

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const response = await fetch(
          `https://eatzyra-backend.vercel.app/api/food-data/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched food item:", data); // For debugging
        setFoodItem(data);
      } catch (err) {
        console.error("Error fetching food item:", err);
      }
    };

    fetchFoodItem();
  }, [id]);

  if (!foodItem) {
    return <p className="text-center my-5">⏳ Loading food details...</p>;
  }

  // Veg and Non-Veg symbols as separate components
  const VegSymbol = () => (
    <span
      style={{
        width: "24px",
        height: "24px",
        border: "3px solid green",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          width: "12px",
          height: "12px",
          backgroundColor: "green",
          borderRadius: "50%",
        }}
      ></span>
    </span>
  );

  const NonVegSymbol = () => (
    <span
      style={{
        width: "24px",
        height: "24px",
        border: "3px solid red",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          width: "12px",
          height: "12px",
          backgroundColor: "red",
          borderRadius: "50%",
        }}
      ></span>
    </span>
  );

  // Normalize food type to lowercase for comparison
  const foodType = foodItem.foodType?.toLowerCase();

  return (
    <div className="container my-5">
      <div className="card border-1 rounded-4">
        <img
          src={foodItem.img}
          className="card-img-top rounded-top-4"
          alt={foodItem.name}
          style={{ maxHeight: "350px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <div className="text-center my-3 d-flex justify-content-center align-items-center gap-2">
            {foodType === "veg" && <VegSymbol />}
            {foodType === "non-veg" && <NonVegSymbol />}
          </div>

          <h6 className="text-muted">{foodItem.CategoryName}</h6>
          <h2 className="card-title fw-bold">{foodItem.name}</h2>
          <p className="card-text text-secondary">{foodItem.description}</p>

          <div className="d-flex justify-content-center gap-3 my-3 flex-wrap">
            {foodItem.options.map((opt, index) => (
              <div
                key={index}
                className="border rounded px-3 py-2 shadow-sm"
              >
                <strong>Half:</strong> ₹{opt.half} | <strong>Full:</strong> ₹
                {opt.full}
              </div>
            ))}
          </div>

          <button className="btn btn-success px-4 py-2 rounded-pill">
            🍴 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

