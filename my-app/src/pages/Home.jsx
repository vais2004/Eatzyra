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
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div>
              <div key={data._id} className="row mb-3">
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />

                {foodItem.length > 0 ? (
                  foodItem
                    .filter((item) => item.CategoryName === data.CategoryName)
                    .map((filteredItem) => (
                      <div
                        key={filteredItem._id}
                        className="col-12 col-md-6 col-lg-3">
                        <Card
                          foodName={filteredItem.name}
                          options={filteredItem.options[0]}
                          imgUrl={filteredItem.img}
                        />
                      </div>
                    ))
                ) : (
                  <p>No such data found!</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No categories found</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
