import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

const APIContext = createContext();

const APIProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get("https://api.pujakaitem.com/api/products");
        const response = await axios.get("https://demo58382.github.io/foodweb/api.json");
        setData(response.data);
        // console.log("API Data:", response.data);
      } catch (error) {
        console.error("error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (<APIContext.Provider value={data}>{children}</APIContext.Provider>);

};

export { APIProvider, APIContext };