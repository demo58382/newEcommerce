import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import { SingleAPI } from "./context/SngProContext.jsx";
import { BsCircleFill, BsStarFill } from "react-icons/bs";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Company from "./components/Company.jsx";
import { useCartContext } from "./context/cartContext.jsx";

const SingleProduct = () => {
  const { id } = useParams();
  const { fetchData, responseData, allImages } = useContext(SingleAPI);

  const { handleCart } = useCartContext();


  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    if (allImages && allImages.length > 0) {
      setPicture(allImages[0]);
    }
  }, [allImages]);



  useEffect(() => {
    // fetchData(`https://api.pujakaitem.com/api/products/${id}`)
    fetchData(`https://demo58382.github.io/foodweb/${id}.json`)
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h2 className="d-flex flex-column min-vh-100 text-center my-5">loading....</h2>;
  }

  const { name, company, price, colors, description, category, featured, stock, reviews, stars, image } = responseData;





  // console.log((image[0].url));



  // const handleClickPhoto = (index) => {
  //   setPicture(image[index].url);
  // }

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const displayText = showMore ? description : description.slice(0, 50);

  const amount = 1;

  return (
    <Wrapper>

      <div className="container-fluid">
        {/* row first */}
        {/* <div className="row p-1">
          <img src={allImages[0]} alt="no image" />
        </div> */}

        {/* row second */}
        {/* <div className="row">

            <img
              className="col-3 p-1"
              src="https://images.pexels.com/photos/3178938/pexels-photo-3178938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="no"
            />
          <img
            className="col-3 p-1"
            src="https://images.pexels.com/photos/3178938/pexels-photo-3178938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="no"
          />
          <img
            className="col-3 p-1"
            src="https://images.pexels.com/photos/3178938/pexels-photo-3178938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="no"
          />

          <img
            className="col-3 p-1"
            src="https://images.pexels.com/photos/3178938/pexels-photo-3178938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="no"
          />

     </div> */}
      </div>
      {/* ---------------------------------------------------------------- */}
      <div className="container-fluid">
        <div className="row">
          <div className="row p-1">
            <img src={picture} alt="no image" />
          </div>
        </div>

        <div className="row">
          {allImages.map((n, i) => {
            return <>
              <img key={i} src={n} alt="Description of the image" onClick={() => setPicture(n)} className="col-3 p-1" />
            </>


          }

          ) || []}
        </div>
      </div>

      {/* ------------------------------------------------------------------------------ */}
      <div className="m-1 p-1">
        <h1>{name}</h1>
        <h2>name: {name}</h2>
        <h2>company:<Company name={company} /> ({company})</h2>
        <h2>price: {price + " ₹"}</h2>
        <h2>available colors:  {colors.map((color, index) => (
          <span key={index}>
            <BsCircleFill style={{ color: color }} className="circle" />
          </span>
        ))}</h2>

        <h2>description: {displayText}
          {description.length > 50 && (
            <span className="readmore" onClick={toggleShowMore}>
              {showMore ? ' Read Less' : '...Read More'}
            </span>
          )}</h2>
        <h2>category: {category}</h2>
        <h2>featured: {featured ? "true" : "false"}</h2>
        <h2>stock: {stock > 0 ? "available" : "not available"} ({stock})</h2>
        <h2>reviews: {reviews}</h2>
        <h2>
          stars:{" "}
           {Array.from({ length: 5 }, (_, index) => {
            let number = index + 0.5;
            return (
              <span key={index}>
                {stars >= index + 1 ? <FaStar style={{color: "gold"}} /> : stars >= number ? <FaStarHalfAlt style={{color: "gold"}} /> : <FaRegStar style={{color: "gold"}} />}
              </span>
            );
          })}
          {" "}({stars})
        </h2>

      </div>

      {/* <h2>image: {image?.map((n) => <img src={n.url} alt="Description of the image" className="small-image" />) || []}</h2> */}

      <NavLink to="/addToCart"><button className="btn btn-info m-3 p-2" onClick={() => handleCart(id, name, image[0].url, price, description, stock, amount)}>Add to Cart</button></NavLink>

    </Wrapper>
  );
};

const Wrapper = styled.section`
  * {
    margin: 0;
    padding: 0;
    /* background-color: blue; */
    /* color: black; */
  }

  h1 {
    text-align: center;
  }

h1,h2,h4{
  /* color:white; */
}

.small-image {
  width: 50px; /* Set the desired width */
  height: 50px; /* Set the desired height */
  margin: 10px;
}

.circle{
  margin: 3px
}

.readmore{
  color: blue;
}



`;

export default SingleProduct;