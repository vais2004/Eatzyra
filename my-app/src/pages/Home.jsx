import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card"; // ✅ Card should be imported, not written in this file
import { toast, ToastContainer } from "react-toastify";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const [foodType, setFoodType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const loadData = async () => {
    try {
      let response = await fetch(
        "https://eatzyra-backend.vercel.app/api/food-data",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let json = await response.json();

      // ✅ Fix: handle both array or object API response
      if (Array.isArray(json)) {
        setFoodItem(json || []);
        setFoodCat([]);
      } else {
        setFoodItem(json.foodItems || []);
        setFoodCat(json.categories || []);
      }
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Header />
      <ToastContainer position="top-right" className="mt-5" autoClose={3000} />

      {/* ================= CAROUSEL ================= */}
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade position-relative"
        data-bs-ride="carousel">
        
        {/* Search bar overlay */}
        <div
          className="position-absolute bottom-0 start-50 translate-middle-x w-75 mb-4 pb-4"
          style={{ zIndex: 10, maxWidth: "90%" }}>
          <div className="d-flex" role="search">
            <input
              className="form-control me-2 text-dark"
              type="search"
              placeholder="Search food..."
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="carousel-inner" style={{ maxHeight: "500px" }}>
          {/* ✅ All carousel items are unchanged */}
          <div className="carousel-item active">
            <img
              src="https://media.istockphoto.com/id/1022778136/photo/chicken-and-fish-tikka-kabab-pune-india.jpg?s=612x612&w=0&k=20&c=LBUQ4BBDEDsrk4nSC_XA7meiavlfeXIUUvVWaYrpIGU="
              className="d-block w-100"
              style={{
                objectFit: "cover",
                maxHeight: "500px",
                filter: "brightness(30%)",
              }}
              alt="Barbeque"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/1298231108/photo/photos-of-various-drinks.jpg?s=612x612&w=0&k=20&c=nCaA8uG07En-a-cxHJQ25_pXC4C-AVhDNAkVKnZyCSw="
              className="d-block w-100"
              style={{
                objectFit: "cover",
                maxHeight: "500px",
                filter: "brightness(30%)",
              }}
              alt="Drinks"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/1487015383/photo/batata-harra-pizza-with-potato-served-in-cutting-board-isolated-on-background-top-view-of.jpg?s=612x612&w=0&k=20&c=UkHNrrxHl9TOdpaF4CXJx7bthZBFZ3sWqlsL9BICxXw="
              className="d-block w-100"
              style={{
                objectFit: "cover",
                maxHeight: "500px",
                filter: "brightness(30%)",
              }}
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/944478708/photo/couple-eating-lunch-with-fresh-salad-and-appetizers.jpg?s=612x612&w=0&k=20&c=xZdIIHvakQrYCbR59RM8nrhEnw-xu4nE-BOeOhQPnck="
              className="d-block w-100"
              style={{
                objectFit: "cover",
                maxHeight: "500px",
                filter: "brightness(30%)",
              }}
              alt="Salad"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/1038065454/photo/bowls-with-chow-mein.jpg?s=612x612&w=0&k=20&c=Um-yBOKIzCrccvMRjIpm0_h6xFhkx5q8okrYdGa75aM="
              className="d-block w-100"
              style={{
                objectFit: "cover",
                maxHeight: "500px",
                filter: "brightness(30%)",
              }}
              alt="Noodles"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/1290444763/photo/assorted-of-indian-dish-with-curry-dish-naan-chicken.jpg?s=612x612&w=0&k=20&c=5q09leP6_QnvdUEfsB6KUXDTTBJtl88bEwrDfRVNA0U="
              className="d-block w-100"
              style={{
                objectFit: "cover",
                maxHeight: "500px",
                filter: "brightness(30%)",
              }}
              alt="Indian food"
            />
          </div>
        </div>

        {/* Carousel controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev">
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next">
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="container my-3 gap-2">
        {/* Food Type Filter */}
        <label className="me-2 fs-5">Filter by Food Type:</label>
        <select
          className="form-select w-25"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}>
          <option value="">All Types</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>

        <br />

        {/* Category Filter */}
        <label className="me-2 fs-5">Filter by Category:</label>
        <select
          className="form-select w-25"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {foodCat.map((cat) => (
            <option key={cat._id} value={cat.CategoryName}>
              {cat.CategoryName}
            </option>
          ))}
        </select>
      </div>

      {/* ================= FOOD CARDS ================= */}
      <div className="container-fluid mt-4">
        <div className="row">
          {foodItem
            .filter(
              (item) =>
                (selectedCategory === "" ||
                  item.CategoryName === selectedCategory) &&
                item.name.toLowerCase().includes(search.toLowerCase()) &&
                (foodType === "" || item.foodType === foodType)
            )
            .map((filteredItem) => (
              <div
                key={filteredItem._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4">
                
                {/* ✅ Card is imported from Card.js */}
                <Card
                  foodItem={filteredItem}
                  options={filteredItem.options[0]}
                />
              </div>
            ))}
        </div>

        {/* Show loading message if no items */}
        {foodItem.filter(
          (item) =>
            (selectedCategory === "" ||
              item.CategoryName === selectedCategory) &&
            item.name.toLowerCase().includes(search.toLowerCase()) &&
            (foodType === "" || item.foodType === foodType)
        ).length === 0 && (
          <p className="alert alert-primary m-3">loading...</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
