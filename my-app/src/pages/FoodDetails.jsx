import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
        //console.log("Fetched food item:", data); // For debugging
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

  // veg and Non-Veg symbols
  const VegSymbol = () => (
    <>
      <span
        style={{
          width: "24px",
          height: "24px",
          border: "3px solid green",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <span
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: "green",
            borderRadius: "50%",
          }}></span>
      </span>
      <span className="text-success">VEG</span>
    </>
  );

  const NonVegSymbol = () => (
    <>
      <span
        style={{
          width: "24px",
          height: "24px",
          border: "3px solid red",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <span
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: "red",
            borderRadius: "50%",
          }}></span>
      </span>
      <span className="text-danger">NON VEG</span>
    </>
  );

  // normalize food type to lowercase
  const foodType = foodItem.foodType?.toLowerCase();

  return (
    <>
      <Header />
      <main className="container my-5">
        <div className="card border-1 rounded-4">
          <img
            src={foodItem.img}
            className="card-img-top rounded-top-4"
            alt={foodItem.name}
            style={{ maxHeight: "350px", objectFit: "cover" }}
          />
          <div className="card-body ">
            <div className="my-3 gap-2">
              {foodType === "veg" && <VegSymbol />}
              {foodType === "non-veg" && <NonVegSymbol />}
            </div>

            <h6 className="text-muted">{foodItem.CategoryName}</h6>
            <h2 className="card-title fw-bold">{foodItem.name}</h2>
            <p className="card-text text-secondary">{foodItem.description}</p>

            <div className="d-flex justify-content-center gap-3 my-3 flex-wrap">
              {foodItem.options.map((opt, index) => (
                <div key={index} className="border rounded px-3 py-2 shadow-sm">
                  <strong>Half:</strong> ₹{opt.half} | <strong>Full:</strong> ₹
                  {opt.full}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
