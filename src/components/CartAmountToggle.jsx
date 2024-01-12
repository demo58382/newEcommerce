import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartAmountToggle = ({ amount, setDecrease, setIncrease }) => {
  return (
    <>
      {/* <div className="">
        <button onClick={() => setDecrease()}>
          <FaMinus />
        </button>
        <span className="">{amount}</span>
        <button onClick={() => setIncrease()}>
          <FaPlus />
        </button>
      </div> */}

      <span>
        <div className="btn-group" role="group" aria-label="Basic outlined example">
          <button type="button" className="btn btn-outline-primary" onClick={() => setDecrease()}>-</button>
          <span className="btn btn-outline-primary disabled text-dark">{amount}</span>
          <button type="button" className="btn btn-outline-primary" onClick={() => setIncrease()}>+</button>
        </div>
      </span>
    </>
  );
};

export default CartAmountToggle;