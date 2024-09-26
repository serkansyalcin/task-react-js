import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { getStyles } from "./styles";
import axios from "axios";
import { API_BASE_URL } from "../../config";

export default function DeleteDialog(props) {
  const { openDialog, setOpenDialog, row, fetchProducts, setLoading , loading } = props;
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    setLoading(true);

    try {
      handleClose();
      const response = await axios.delete(`${API_BASE_URL}products/${row._id}`);
      await fetchProducts();
    } catch (error) {
      console.log("error", error);
    }
    finally{
      setLoading(false);

    }
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        sx={{
          ".MuiPaper-root": getStyles.dialogParent,
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#222",
            textAlign: "center",
          }}
        >
          {`Are you sure you want to delete the product?`}
        </DialogTitle>
        <DialogActions sx={getStyles.actionBtns}>
          <Button 
            onClick={() => handleDelete()}
            sx={getStyles.singleActionBtn}
            color="error"
            variant="contained"
          >
            Yes, Delete
          </Button>
          <Button
            onClick={handleCancel}
            sx={getStyles.singleActionBtn}
            variant="outlined"
            color="inherit"
          >
            No, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
