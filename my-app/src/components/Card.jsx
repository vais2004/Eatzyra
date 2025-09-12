import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();

  let options = props.options;
  let priceOption = Object.keys(options);

  const [quantity, setQuantity] = useState(1);
  //const [size, setSize] = useState("");
  const [size, setSize] = useState(priceOption[0]);

  let finalPrice = quantity * parseInt(options[size]);

  const handleAddToCart = async () => {
    //console.log("cart data before:", data);

    let food = data.find((item) => item.id === props.foodItem._id);
    //console.log("Existing item in cart:", food);

    if (food) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          quantity: quantity,
        });
      } else {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          quantity: quantity,
          size: size,
        });
      }
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        quantity: quantity,
        size: size,
      });
    }

    // this will still show "old" data (because React updates next render)
    //console.log("cart data after dispatch (will update on next render):", data);
  };

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
          <button onClick={handleAddToCart} className="btn btn-outline-success">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
