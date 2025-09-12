import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return <p className="m-5 w-100 center fs-4">This Cart is Empty!</p>;
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <>
      <div className="container m-auto mt-5 table-responsive table responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr className="text-success">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={food.id}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn bg-danger text-light px-2 py-0"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}>
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <p className="fs-3">Total Price: {totalPrice}</p>
        </div>
      </div>
    </>
  );
}
