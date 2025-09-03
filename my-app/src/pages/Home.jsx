import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousal from "../components/Carousal";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

   const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/food-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let json = await response.json();
      console.log(json);

      // assign response data
      setFoodItem(json.foodItems || []);
      setFoodCat(json.categories || []);
    
    } catch (err) {
      console.error("Error loading data:", err);
     
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Carousal />
      </div>
      <div className="container m-4">
        <Card />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
