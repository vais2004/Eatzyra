import React, { useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();

  let options = props.options;
  let priceOption = Object.keys(options);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(priceOption[0]);

  let finalPrice = quantity * parseInt(options[size]);

  // check if item with same id + size already in cart
  let foodInCart = data.find(
    (item) => item.id === props.foodItem._id && item.size === size
  );

  const handleToggleCart = async () => {
    if (foodInCart) {
      // remove item from cart
      await dispatch({
        type: "REMOVE",
        id: props.foodItem._id,
        size: size,
      });
    } else {
      // add item to cart
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        quantity: quantity,
        size: size,
        img: props.foodItem.img,
      });
    }
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

          <div className="container w-100">
            <select
              className="m-2 h-100 col-2 text-center bg-success text-light rounded"
              onChange={(e) => setQuantity(parseInt(e.target.value))}>
              {Array.from(Array(10), (e, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>

            <select
              className="m-2 h-100 col-5 text-center bg-success text-light rounded"
              onChange={(e) => setSize(e.target.value)}>
              {priceOption.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>

            <br />
            <div className="d-inline h-100">
              <b>Total Price:</b> ₹{finalPrice}/-
            </div>
          </div>

          {/* Toggle button */}
          <button
            onClick={handleToggleCart}
            className={`btn ${
              foodInCart ? "btn-danger" : "btn-outline-success"
            } mt-2`}>
            {foodInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
