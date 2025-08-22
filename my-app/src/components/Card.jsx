import React from "react";

export default function Card() {
  return (
    <div>
      <div className="card" style={{ width: "18rem", maxHeight: "360px" }}>
        <img src="https://media.istockphoto.com/id/1341504203/photo/fried-momos-dumpling.jpg?s=612x612&w=0&k=20&c=mCUGBqUZw1M7Eu8Bh232by22Q5xKuhJkPG1h6BenbRs=" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
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
              <option value="half">Half</option>
              <option value="full">Full</option>
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
