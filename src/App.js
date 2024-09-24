import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import "./App.css";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import SearchBox from "./components/SearchBox";
import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "./components/Loader";

function App() {
  const [data, setData] = useState(null); // Start with null instead of undefined
  const [filteredData, setFilteredData] = useState(null);
  const [price, setPrice] = useState(0);
  const [sharedData, setSharedData] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("https://fakestoreapi.com/products");
        setData(result.data);
        setFilteredData(result.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  // Centralize filtering logic based on both price and categories
  useEffect(() => {
    function filterData() {
      if (data) {
        const newdata = data.filter((pdata) => {
          const isPriceMatch = price === 0 || pdata.price <= price;
          const isCategoryMatch = sharedData.length === 0 || sharedData.includes(pdata.category);
          return isPriceMatch && isCategoryMatch;
        });
        setFilteredData(newdata);
      }
    }

    filterData();
  }, [data, price, sharedData]); // Run when price or categories change

  // Function to handle price filter updates
  const sharePrice = (pricedata) => {
    setPrice(pricedata); // Simply set the price, filtering happens automatically
  };

  // Function to handle category filter updates
  const shareValue = (checkboxdata) => {
    setSharedData(checkboxdata); // Set selected categories, filtering happens automatically
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            data ? (
              <>
                <SearchBox />
                <div className="flex justify-between">
                  <Sidebar sharePrice={sharePrice} shareValue={shareValue} />
                  <Home filteredData={filteredData} />
                </div>
              </>
            ) : (
              <Loader />
            )
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
