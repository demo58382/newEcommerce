import styled from "styled-components";
import React, { useContext } from "react";
import { APIContext } from "./context/productContext.jsx";
import { NavLink } from "react-router-dom";
import { BsCircleFill } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import Company from "./components/Company.jsx";
import Description from "./components/Description.jsx";
import { SingleAPI } from "./context/SngProContext.jsx";
// import { useCartContext } from "./context/cartContext.jsx";

const Home = () => {
  const data = useContext(APIContext);
  const person = useContext(SingleAPI);
  // const {state} = useCartContext();

  return (
    <Wrapper>
      <div className="d-flex flex-column min-vh-100">
        <h4 className="text-center">Home page</h4>
        <h6 className="text-center">Our Featured Products:</h6>

        <div className="container">
          <div className="row m-2">
            {data.map((n) => {
              if (n.featured) {
                return (
                  <div className="col-md-4 " key={n.id}>
                    <NavLink className="text-decoration-none" to={`/singleProduct/${n.id}`}>
                      <div className="card m-3 p-3" style={{ width: "18rem" }}>
                        <figure>
                          <img src={n.image} className="card-img-top" alt="..." />
                          <figcaption className="caption">{n.category}</figcaption>
                          <figcaption className="caption2">{n.company.charAt(0).toUpperCase() + n.company.slice(1)}</figcaption>
                        </figure>
                        <div className="card-body">
                          <h5 className="card-title">{n.name}</h5>
                          {/* <p className="card-text">{n.description.slice(0, 50)}  <span style={{ color: "blue" }}>...show more</span></p> */}
                          Available Colors: {n.colors.map((color, i) => <FaCircle className="mx-1" key={i} style={{ color: color }} />)}

                          <h6 className="mt-3">MRP: <del>&#x20B9; {n.price + 1575}</del></h6>
                          <h6 className="card-title text-success">Sale Price: &#x20B9; {n.price}</h6>
                          <button className="btn btn-success">Add To Cart</button>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>





        {/* <div class="container">
        <div class="row">
          {state.filter_products.map(n => <div class="col-md-4">
            <NavLink className="text-decoration-none" to={`/singleProduct/${n.id}`} key={n.id}>
              <div className="card m-3 p-3" style={{ width: "18rem" }}>
                <figure>
                  <img src={n.image} className="card-img-top" alt="..." />
                  <figcaption className="caption">{n.category}</figcaption>
                  <figcaption className="caption2">{n.company.charAt(0).toUpperCase() + n.company.slice(1)}</figcaption>
                </figure>
                <div className="card-body">
                  <h5 className="card-title">{n.name}</h5>

                  Available Colors: {n.colors.map((color, i) => <FaCircle className="mx-1" key={i} style={{ color: color }} />)}

                  <h6 className="mt-3">MRP: <del>&#x20B9; {parseInt(n.price / 100) + 1575}</del></h6>
                  <h6 className="card-title text-success">Sale Price: &#x20B9; {parseInt(n.price / 100)}</h6>
                  <a href="#" className="btn btn-success">Add To Cart</a>
                </div>
              </div>
            </NavLink>
          </div>)}
        </div>
      </div> */}




        {/* <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Price</th>
            <th>Colors</th>
            <th>Image</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {data.map((c) => {
            if (c.featured) {
              return (
                <tr key={c.id}>
                  <td>
                    <NavLink to={`/singleProduct/${c.id}`} className="link">
                      {c.name}
                    </NavLink>
                  </td>

                  <td>
                    <Company name={c.company} /> ({c.company})
                  </td>
                  <td>{parseInt((c.price / 100).toFixed(0)) + " ₹"}</td>
                  <td>
                    {c.colors.map((color, index) => (
                      <span key={index}>
                        <BsCircleFill style={{ color: color }} className="circle" />
                      </span>
                    ))}
                  </td>
                  <td>
                    <img src={c.image} alt="Description of the image" className="small-image" />
                  </td>
                  <td><Description description={c.description}/></td>
                  <td>{c.category}</td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table> */}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  /* background-color: blue;
  color: white; */
  margin: 0;
  padding: 0;
  text-align: center;


  h4 {
    text-align: center;
  }

  /* Style for the entire table */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 0px;
  }

  /* Style for table header cells */
  th {
    background-color: black;
    color: white;
    padding: 10px;
    text-align: center;
    border: 1px solid #ccc;
  }

  /* Style for table body cells */
  td {
    padding: 10px;
    text-align: center;
    border: 1px solid #ccc;
  }

  /* Style for alternating rows */
  /* tr:nth-child(even) {
    background-color: #f2f2f2;
  } */

  .small-image {
    width: 50px; /* Set the desired width */
    height: 50px; /* Set the desired height */
  }

  .link {
      text-decoration: none;

  }


  .circle{
    margin: 3px
  }


  .caption {
      position: absolute;
      top: 5%;
      right: 10%;
      text-transform: uppercase;
      background-color: #cfcccc;
      color: black;
      padding: 8px 12px;
      font-size: 10px;
      border-radius: 2rem;
  }

  .caption2 {
      position: absolute;
      top: 35%;
      right: 40%;
      text-transform: uppercase;
      background-color: #2758bb;
      color: white;
      padding: 8px 12px;
      font-size: 10px;
      border-radius: 2rem;
  }
`;

export default Home;