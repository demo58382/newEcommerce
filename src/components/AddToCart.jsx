import React from "react";
import { useCartContext } from "../context/cartContext.jsx";
import CartAmountToggle from "../components/CartAmountToggle.jsx";

const AddToCart = () => {
  const { state, handleRemove, setDecrease, setIncrement } = useCartContext();



  // console.log(state);
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="text-center my-2">Cart Page</div>
      {state.cart.length === 0 ? "Cart is empty...." :
        state.cart.map((n, index) => (
          <div className="card my-3 m-1" key={index}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={n.image} className="img-fluid  p-2 " alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body ">
                  <h5 className="card-title">{n.name}</h5>
                  {/* <h5 className="card-title">{n.amount}</h5> */}
                  {/* <h5 className="card-title">{n.id}</h5> */}
                  <p className="card-text">{n.description.slice(0, 51)}...</p>
                  <div>{n.price * n.amount} &#x20B9;</div>

                  <p>
                    <CartAmountToggle
                      amount={n.amount}
                      setDecrease={() => setDecrease(n.id)}
                      setIncrease={() => setIncrement(n.id)}
                    />

                    <button className="btn btn-danger mx-5" onClick={() => handleRemove(n.name)}>Remove</button>
                  </p>

                </div>
              </div>
            </div>
          </div>

        ))}


      {state.total_price === 0 ? null :
        <div className="card text-center m-4">

          <h5 className="card-header">Price Details</h5>
          <div className="card-body">
            <div className="card-text">Price ({state.cart.length} items): {state.total_price} &#x20B9;</div>
            <div className="card-text">Delivery Charges: 500 &#x20B9;</div>
            <hr className="" />
            <h6 className="card-text">Total Amount: {state.total_price + 500} &#x20B9;</h6>
            <button className="btn btn-primary my-3">Pay Now</button>
          </div>

        </div>
      }

    </div>
  );
};

export default AddToCart;