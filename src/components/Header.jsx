import styled from "styled-components";
import {NavLink} from "react-router-dom";
import { useCartContext } from "../context/cartContext.jsx";

const Header = ()=>{
  const {state} = useCartContext();
  return (
   <Wrapper>
     <h4>Rohel Quadri's Store</h4>
     <ul>
      <li><NavLink to="/" className="link">Home</NavLink></li>
      <li><NavLink to="/products" className="link">Products</NavLink></li> 
      <li><NavLink to="/addToCart" className="link">Cart({state.cart.length})</NavLink></li> 
     </ul>

   </Wrapper> 



  )
}

const Wrapper = styled.section`
*{background-color: red;
color: white;
margin: 0;
padding: 0;
 }

ul{
  display: flex;
  list-style:none;
  padding: 0;
}

li .link:hover{
  color:green;
}

.link{
  text-decoration: none;
  padding: 0px 10px;
  justify-content: center;
}

h4{
  text-align: center;
}

`;

export default Header;