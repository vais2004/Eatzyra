import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState("");

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
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade position-relative"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}>
          {/* Search Bar Overlay */}
          <div
            className="position-absolute bottom-0 start-50 translate-middle-x w-75 mb-5 pb-5"
            style={{ zIndex: 10 }}>
            <div className="d-flex" role="search">
              <input
                className="form-control me-2 text-dark"
                type="search"
                placeholder="Search food..."
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  console.log("Search term:", e.target.value);
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="carousel-inner" style={{ maxHeight: "500px" }}>
            <div className="carousel-item active">
              <img
                src="https://media.istockphoto.com/id/1022778136/photo/chicken-and-fish-tikka-kabab-pune-india.jpg?s=612x612&w=0&k=20&c=LBUQ4BBDEDsrk4nSC_XA7meiavlfeXIUUvVWaYrpIGU="
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Barbeque"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://media.istockphoto.com/id/1298231108/photo/photos-of-various-drinks.jpg?s=612x612&w=0&k=20&c=nCaA8uG07En-a-cxHJQ25_pXC4C-AVhDNAkVKnZyCSw="
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Drinks"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://media.istockphoto.com/id/1487015383/photo/batata-harra-pizza-with-potato-served-in-cutting-board-isolated-on-background-top-view-of.jpg?s=612x612&w=0&k=20&c=UkHNrrxHl9TOdpaF4CXJx7bthZBFZ3sWqlsL9BICxXw="
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Pizza"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://media.istockphoto.com/id/944478708/photo/couple-eating-lunch-with-fresh-salad-and-appetizers.jpg?s=612x612&w=0&k=20&c=xZdIIHvakQrYCbR59RM8nrhEnw-xu4nE-BOeOhQPnck="
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Salad"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://media.istockphoto.com/id/1038065454/photo/bowls-with-chow-mein.jpg?s=612x612&w=0&k=20&c=Um-yBOKIzCrccvMRjIpm0_h6xFhkx5q8okrYdGa75aM="
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Noodles"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://media.istockphoto.com/id/1290444763/photo/assorted-of-indian-dish-with-curry-dish-naan-chicken.jpg?s=612x612&w=0&k=20&c=5q09leP6_QnvdUEfsB6KUXDTTBJtl88bEwrDfRVNA0U="
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Indian food"
              />
            </div>
          </div>

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
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filteredItem) => (
                      <div
                        key={filteredItem._id}
                        className="col-12 col-md-6 col-lg-3">
                        <Card
                          foodItems={filteredItem}
                          options={filteredItem.options[0]}
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
