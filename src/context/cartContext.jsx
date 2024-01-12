import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {


  const [state, setState] = useState( {

                                       cart: [],
                                       total_item: 0,
                                       total_price: 0,
                                       shipping_fee: 50000,
                                     });


  const handleCart = (id, name, image, price, description, stock, amount) => {
    let newState = {...state, 
                      cart:[...state.cart, {id: id, name: name, image: image, price: price, description: description, stock: stock, amount: amount }]};
    // Update the state with the new array
    setState(newState);
  }

  const handleRemove = (name) => {
    const newState = state.cart.filter((item) => item.name !== name);
    setState({...state, cart: newState});
  }

  const setDecrease = (id) => {
    setState(()=>{
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === id) {
          let decAmount = curElem.amount - 1;

          if (decAmount <= 1) {
            decAmount = 1;
          }

          return {
            ...curElem,
            amount: decAmount,
          };
        } else {
          return curElem;
        }
      });
      return { ...state, cart: updatedProduct };
    });
  };

  const setIncrement = (id) => {
     setState(()=>{
       let updatedProduct = state.cart.map((curElem) => {
         if (curElem.id === id) {
           let incAmount = curElem.amount + 1;

           if (incAmount >= curElem.stock) {
             incAmount = curElem.stock;
           }

           return {
             ...curElem,
             amount: incAmount,
           };
         } else {
           return curElem;
         }
       });
       return { ...state, cart: updatedProduct };
     });
  };

  useEffect(()=>{
    setState(()=>{
      let { total_item, total_price } = state.cart.reduce(
        (accum, curElem) => {
          let { price, amount } = curElem;

          accum.total_item += amount;
          accum.total_price += price * amount;

          return accum;
        },
        {
          total_item: 0,
          total_price: 0,
        }
      );
      return {
        ...state,
        total_item,
        total_price,
      };
    });
  }, [state.cart]);


  return (
    <CartContext.Provider value={{ state, handleCart, handleRemove,setDecrease, setIncrement }}>
      {children}
    </CartContext.Provider>
  )
};


const useCartContext = () => {
  return useContext(CartContext);
};


export { CartContext, CartProvider, useCartContext };