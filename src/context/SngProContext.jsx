import React, { createContext, useState } from "react";
import axios from "axios";

const SingleAPI = createContext();

const SingleAPIProvider = ({ children }) => {
  const [responseData, setResponseData] = useState({});

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      setResponseData( await response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const {image} = responseData;
  const allImages = image?.map((n) => n.url);
  console.log(allImages);

  return <SingleAPI.Provider value={{ fetchData, responseData, allImages }}>{children}</SingleAPI.Provider>;
};

export { SingleAPIProvider, SingleAPI };