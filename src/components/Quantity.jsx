import { useState, useEffect } from "react";
import { useCartContext } from "../context/cartContext.jsx";


const Quantity = ({ stock, price, name }) => {
  const { state, updateTotalPrice } = useCartContext();
  const [newPrice, setNewPrice] = useState(state);

  const [num, setNum] = useState(1);
  const [uprice, setUprice] = useState(price);


  useEffect(() => {
    setNewPrice(() => state.map(n => (n.name === name) ? { price: uprice * 100 } : n));
    updateTotalPrice(newPrice, num);
  }, [uprice, name, state, newPrice]);


  const handleDecrease = () => {
    if (num > 1) {
      setUprice(price * (num - 1));
      setNum(num - 1);

    }
  }

  const handleIncrease = () => {
    if (num < stock) {
      setUprice(price * (num + 1));
      setNum(num + 1);


    }
  }
  return (
    <>
      <div> Price: {uprice} ₹</div>
      {/* <div>{newPrice.map(n => <div>{parseInt(n.price / 100)}</div>)}</div> */}
      {/* <div>Total: {newPrice.reduce((a,b)=> a.price+b.price)}</div> */}
      <span>
        <div className="btn-group" role="group" aria-label="Basic outlined example">
          <button type="button" className="btn btn-outline-primary" onClick={handleDecrease}>-</button>
          <span className="btn btn-outline-primary disabled text-dark">{num}</span>
          <button type="button" className="btn btn-outline-primary" onClick={handleIncrease}>+</button>
        </div>
      </span>
    </>
  )
}

export default Quantity;