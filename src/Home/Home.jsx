import { useState } from "react";
import "./home.css";
import FormDialog from "./components/FormDialog.jsx";
import { Button } from "@mui/material"; 


const Home = () => {
  const [open, setOpen] = useState(false);

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


    </div>
  );
};

export default Home;
