import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();

  let options = props.options;
  let priceOption = Object.keys(options);

  const [quantity, setQuantity] = useState(1);
  //const [size, setSize] = useState("");
  const [size, setSize] = useState(priceOption[0]);

  const handleAddToCart = async () => {
    //     console.log("Adding to cart:", {
    //   id: props.foodItem._id,
    //   name: props.foodItem.name,
    //   price: finalPrice,
    //   quantity: quantity,
    //   size: size,
    // });
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      quantity: quantity,
      size: size,
    });
  };

  let finalPrice = quantity * parseInt(options[size]);

  return (
    <div>
      <div className="card" style={{ width: "18rem", maxHeight: "380px" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="food item"
          style={{ maxHeight: "170px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          {/* <p className="card-text">Some quick example text.</p> */}
          <div className="container w-100">
            <select
              className="m-2 h-100 col-2 text-center bg-success  text-light  rounded"
              onChange={(e) => setQuantity(parseInt(e.target.value))}>
              {Array.from(Array(10), (e, index) => {
                return (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2  h-100 col-5 text-center bg-success text-light rounded"
              onChange={(e) => setSize(e.target.value)}>
              {priceOption.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <br />
            <div className="d-inline h-100">
              <b>Total Price:</b> ₹{finalPrice}/-
            </div>
          </div>
          <Link onClick={handleAddToCart} className="btn btn-outline-success">
            Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
