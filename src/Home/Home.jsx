import { useState, useEffect } from "react";
import "./home.css";
import ProductsTable from "./components/ProductsTable.jsx";
import FormDialog from "./components/FormDialog.jsx";
import { Button, CircularProgress } from "@mui/material"; 
import axios from "axios";
import { API_BASE_URL } from "../config";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}products`);
      setProducts(response.data);
    } catch (error) {
      alert("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className="home-wrapper">
      <div className="add-product-wrapper">
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Product
        </Button>
        <FormDialog {...{ setOpen, open, fetchProducts  }} />
      </div>

      {/* Show loader while fetching products */}
      {loading&&(
        <div className="loader-wrapper">
          <CircularProgress  size={80} />
        </div>
      )}

      <ProductsTable {...{ productsArr: products, fetchProducts ,loading , setLoading }} />
    </div>
  );
};

export default Home;
