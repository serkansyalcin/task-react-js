import { useState } from "react";
import "./home.css";
import ProductsTable from "./components/ProductsTable.jsx";
import FormDialog from "./components/FormDialog.jsx";
import { Button } from "@mui/material"; 



const Home = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className="home-wrapper">
      <div className="add-product-wrapper">
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Product
        </Button>
        <FormDialog {...{ setOpen, open  }} />
      </div>



      <ProductsTable {...{ productsArr: products}} />
    </div>
  );
};

export default Home;
