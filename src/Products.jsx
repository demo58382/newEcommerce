import styled from "styled-components";
import React, { useContext, useReducer, useEffect } from "react";
import { APIContext } from "./context/productContext.jsx";
import { NavLink } from "react-router-dom";
import { BsCircleFill } from 'react-icons/bs';
import { FaCheck, FaCircle } from 'react-icons/fa';
import Company from "./components/Company.jsx";
import Description from "./components/Description.jsx";
import ColorDropdown from "./components/ColorDropdown.jsx";


const Products = () => {
  const data = useContext(APIContext);

  const allColors = ["--select--", "all", ...new Set([].concat(...data.map(item => item.colors)))];
  const allCompany = ["All", ...new Set([].concat(...data.map(item => item.company)))];
  const allCategory = ["All", ...new Set([].concat(...data.map(item => item.category)))];

  const initialState = {
    all_products: [],
    filter_products: [],

    filters: {
      text: "",
      color: "--select--",
      company: "--select--",
      category: "--select--",
      sort: "--select--"
    }
  }



  const reducer = (state, action) => {
    switch (action.type) {
      case "LOAD_ALL_DATA":
        return {
          ...state,
          all_products: action.payload,
          filter_products: action.payload
        }

      case "UPDATE_FILTER_VALUE":
        const { name, value } = action.payload;
        return {
          ...state,
          filters: {
            ...state.filters,
            [name]: value
          }
        }

      case "FILTER_PRODUCTS":
        let { all_products } = state;
        let tempFilterProduct = [...all_products];

        const { text, color, company, category, sort } = state.filters;

        if (text) {
          tempFilterProduct = tempFilterProduct.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
        }

        if (color !== "all" && color !== "--select--") {
          tempFilterProduct = tempFilterProduct.filter(item => item.colors.includes(color));
        }

        if (company !== "All" && company !== "--select--") {
          tempFilterProduct = tempFilterProduct.filter(item => item.company.toLowerCase().includes(company.toLowerCase()));
        }

        if (category !== "All" && category !== "--select--") {
          tempFilterProduct = tempFilterProduct.filter(item => item.category.toLowerCase().includes(category.toLowerCase()));
        }

        if (sort === "Price (Lowest)") {
          tempFilterProduct = tempFilterProduct.sort((a, b) => a.price - b.price);

        } else if (sort === "Price (Highest)") {
          tempFilterProduct = tempFilterProduct.sort((a, b) => b.price - a.price);
        }

        else if (sort === "Name (A-Z)") {
          tempFilterProduct = tempFilterProduct.sort((a, b) => a.name.localeCompare(b.name));
        }

        else if (sort === "Name (Z-A)") {
          tempFilterProduct = tempFilterProduct.sort((a, b) => b.name.localeCompare(a.name));
        }

        return {
          ...state,
          filter_products: tempFilterProduct,
        }

      case "CLEAR_FILTERS":
        return {
          ...state,
          filters: {
            ...initialState.filters,
            text: state.filters.text,
          }
        }


      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateFilterValue = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "UPDATE_FILTER_VALUE",
      payload: { name, value }
    })
  };

  useEffect(() => {
    dispatch({
      type: "LOAD_ALL_DATA",
      payload: data
    });

    dispatch({
      type: "FILTER_PRODUCTS",
    });

  }, [data, state.filters]);

  // console.log(state.filters);

  return (
    <Wrapper>

      <h4>All Products ({state.filter_products.length})</h4>


      <div className="my-3">
        <input name="text" type="text" value={state.filters.text} placeholder="Search here..." onChange={updateFilterValue}></input>
      </div>

      <h6 className="mt-5">Filter Section:</h6>

      {/* <div className="container d-flex flex-wrap justify-content-between">
        <div>
          <label>Company:</label>
          <select name="company" value={state.filters.company} id="sortOptions" onChange={updateFilterValue}>
            <option  >--select--</option>
            {allCompany.map((company, index) => <option key={index}>{company.charAt(0).toUpperCase() + company.slice(1)}</option>)}
          </select>
        </div>

        <div>
          <label>Category:</label>
          <select name="category" value={state.filters.category} id="sortOptions" onChange={updateFilterValue}>
            <option >--select--</option>
            {allCategory.map((category, index) => <option key={index}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>)}
          </select>
        </div>



        <div style={{ display: "flex" }} >
          <div>Color:</div>
          <ColorDropdown name="color" value={state.filters.color} onChange={updateFilterValue} props={allColors} />
        </div>


        <div>
          <label>Sort by:</label>
          <select name="sort" value={state.filters.sort} id="sortOptions" onChange={updateFilterValue}>
            <option >--select--</option>
            <option >Price (Lowest)</option>
            <option >Price (Highest)</option>
            <option >Name (A-Z)</option>
            <option >Name (Z-A)</option>
          </select>
        </div>

      </div> */}
      {/* ----------------------filter section start----------- */}

      <div className="container border my-4">
        <div className="row">
          <div className="col-md-3 mb-3">
            <label>Company:</label>
            <select className="form-select" name="company" value={state.filters.company} onChange={updateFilterValue}>
              <option value="">--select--</option>
              {allCompany.map((company, index) => (
                <option key={index}>{company.charAt(0).toUpperCase() + company.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3 mb-3">
            <label>Category:</label>
            <select className="form-select" name="category" value={state.filters.category} onChange={updateFilterValue}>
              <option value="">--select--</option>
              {allCategory.map((category, index) => (
                <option key={index}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3 mb-3" >
            <label className="me-2">Color:</label>
            <ColorDropdown name="color" value={state.filters.color} onChange={updateFilterValue} props={allColors} />
          </div>

          <div className="col-md-3 mb-3">
            <label>Sort by:</label>
            <select className="form-select" name="sort" value={state.filters.sort} onChange={updateFilterValue}>
              <option value="">--select--</option>
              <option value="Price (Lowest)">Price (Lowest)</option>
              <option value="Price (Highest)">Price (Highest)</option>
              <option value="Name (A-Z)">Name (A-Z)</option>
              <option value="Name (Z-A)">Name (Z-A)</option>
            </select>
          </div>
        </div>
      </div>


      {/* --------------------------filter section end------------ */}



      <div>
        <button type="button" class="btn btn-primary position-relative" onClick={() => dispatch({ type: "CLEAR_FILTERS" })}>
          Clear All Filters
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {Object.values(state.filters).filter
              (value => value !== "All" && value !== "--select--" && value !== "" && value !== state.filters.text  && value !== "all").length
            }
            <span class="visually-hidden">unread messages</span>
          </span>
        </button>
      </div>



      {/* ----------card start----------------------- */}
      {/* <div className="row justify-content-between w-100"> */}
      {/* <div className="container  d-flex flex-wrap">
        {state.filter_products.map(n => (
          <NavLink to={`/singleProduct/${n.id}`} className="link" key={n.id}>
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
        ))}
      </div> */}





      <div class="container">
        <div class="row m-2">
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
                  {/* <p className="card-text">{n.description.slice(0, 50)}  <span style={{ color: "blue" }}>...show more</span></p> */}
                  Available Colors: {n.colors.map((color, i) => <FaCircle className="mx-1" key={i} style={{ color: color }} />)}

                  <h6 className="mt-3">MRP: <del>&#x20B9; {parseInt(n.price / 100) + 1575}</del></h6>
                  <h6 className="card-title text-success">Sale Price: &#x20B9; {parseInt(n.price / 100)}</h6>
                  <button className="btn btn-success">Add To Cart</button>
                </div>
              </div>
            </NavLink>
          </div>)}
        </div>
      </div>


      {/* ----------card end----------------------- */}


      {/* -------------table---------------------- */}
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
          {state.filter_products.map((c) => (
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
              <td><Description description={c.description} /></td>
              <td>{c.category}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

    </Wrapper >
  );
};

const Wrapper = styled.section`
  /* background-color: blue; */
  /* color: black; */
  margin: 0;
  padding: 0;
  text-align: center;


  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }

  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter-color-style{
    border: 1px solid black;
    padding: 5px;
    padding-bottom: 0;
  }


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
    /* color: white; */
  }


  .circle{
    margin: 3px
  }

  .sort{
    display: flex;
    justify-content: space-between;
  }

  /* .btn{

    margin: 2px;
    width: 40px;
    height: 30px; 
  } */

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

export default Products;