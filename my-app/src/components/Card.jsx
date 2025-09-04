import React from "react";

export default function Card(props) {
  let options = props.options;
  let priceOption = Object.keys(options);

  return (
    <div>
      <div className="card" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={props.imgUrl}
          className="card-img-top"
          alt="food item"
          style={{ maxHeight: "170px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <p className="card-text">Some quick example text.</p>
          <div className="container w-100">
            <select className="m-2 h-100 rounded">
              {Array.from(Array(10), (e, index) => {
                return (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 rounded">
              {priceOption.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100">
              <b>Total Price:</b>
            </div>
          </div>
          <a href="#" className="btn btn-outline-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
}
