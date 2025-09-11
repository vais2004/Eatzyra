import React from "react";
import { Link } from "react-router-dom";
import { useDispatchCart,useCart } from "./ContextReducer";

export default function Card(props) {
  let options = props.options;
  let priceOption = Object.keys(options);
let foodItem = props.foodItems;

  const handleAddToCart=()=>{

  }

  return (
    <div>
      <div className="card" style={{ width: "18rem", maxHeight: "380px" }}>
        <img
          src={foodItem.img}
          className="card-img-top"
          alt="food item"
          style={{ maxHeight: "170px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItem.foodName}</h5>
          {/* <p className="card-text">Some quick example text.</p> */}
          <div className="container w-100">
            <select className="m-2 h-100 col-2 text-center bg-success  text-light  rounded">
              {Array.from(Array(10), (e, index) => {
                return (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2  h-100 col-5 text-center bg-success  text-light rounded">
              {priceOption.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <br/>
            <div className="d-inline h-100">
              <b>Total Price:</b>
            </div>
          </div>
          <Link onClick={handleAddToCart} className="btn btn-outline-success" >
            Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
