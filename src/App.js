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
  const [price, setPrice] = useState(0);

  // Function to handle price changes
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("https://fakestoreapi.com/products");
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

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
                  <Sidebar />
                  <Home data={data} />
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
