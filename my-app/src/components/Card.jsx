import React, { useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  let navigate = useNavigate();

  let options = props.options;
  let priceOption = Object.keys(options);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(priceOption[0]);

  let finalPrice = quantity * parseInt(options[size]);

  let foodInCart = data.find(
    (item) => item.id === props.foodItem._id && item.size === size
  );

  const handleToggleCart = async () => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
      return;
    }

    if (foodInCart) {
      await dispatch({
        type: "REMOVE",
        id: props.foodItem._id,
        size: size,
      });
      toast.error(`Removed "${props.foodItem.name}" from cart.`);
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        quantity: quantity,
        size: size,
        img: props.foodItem.img,
      });
      toast.success(`Added "${props.foodItem.name}" to the cart.`);
    }
  };

  return (
    <div className="d-flex justify-content-center mb-4">
      <div
        className="card shadow-sm h-100"
        style={{ maxWidth: "280px", width: "100%" }}>
        <Link to={`/food/${props.foodItem._id}`}>
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt="food item"
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              borderTopLeftRadius: "0.25rem",
              borderTopRightRadius: "0.25rem",
            }}
          />
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{props.foodItem.name}</h5>

          <div className="d-flex flex-column flex-sm-row align-items-center mt-2">
            <select
              className="m-1 text-center bg-success text-light rounded"
              onChange={(e) => setQuantity(parseInt(e.target.value))}>
              {Array.from(Array(10), (e, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>

            <select
              className="m-1 text-center bg-success text-light rounded"
              onChange={(e) => setSize(e.target.value)}>
              {priceOption.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-2">
            <b>Total Price:</b> ₹{finalPrice}/-
          </div>

          <button
            onClick={handleToggleCart}
            className={`btn ${
              foodInCart ? "btn-danger" : "btn-outline-success"
            } mt-2 w-100`}>
            {foodInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
