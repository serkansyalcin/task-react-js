/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImageSelector from "./ImageSelector";
import { BASE_URL } from "../../config";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(3),
  },
}));

const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required."),
  price: Yup.number()
    .required("Price is required.")
    .min(0, "Price must be positive."),
});

function FormDialog(props) {
  const { setOpen, open, row } = props;
  const [file, setFile] = React.useState(null);

  const handleClose = () => {
    setOpen(false);
    setFile(null);
  };

  const initialValues = {
    name: row ? row.name : "",
    description: row ? row.description : "",
    price: row ? row.price : "",
    stock: row ? row.stock : "",
  };

  const handleFormSubmit = async (values) => {
    handleClose();
  };

  let pictureUrl = null;
  if (row?.imageUrl) {
    pictureUrl = BASE_URL + row.imageUrl;
  }

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{
        '.MuiPaper-root': {
          margin: "0",
        }
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {() => (
          <Form className="form-c">
            <div className="heading">
              <DialogTitle sx={{ m: 0, p: 1 , fontSize : 18 }} id="customized-dialog-title">
                {row ? "Edit Product" : "Add New Product"}
              </DialogTitle>
              <IconButton  aria-label="close" onClick={handleClose}>
                <CloseIcon className="icon-btn" />
              </IconButton>
            </div>
            <DialogContent dividers>
              <div className="form-section">
                <div className="img-selector-section">
                  <ImageSelector {...{ setFile, pictureUrl }} />
                </div>

                <div>
                  <div className="fields-row">
                    <div className="field-wrapper">
                      <label htmlFor="name">Product Name</label>
                      <Field id="name" name="name" placeholder="Product name" />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="field-wrapper">
                      <label htmlFor="price">Price</label>
                      <Field
                        type="number"
                        id="price"
                        name="price"
                        placeholder="0.00"
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="stock">Available Stock</label>
                    <Field
                      type="number"
                      id="stock"
                      name="stock"
                      placeholder="0"
                    />
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="description">Description</label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      placeholder="Add Description"
                    />
                  </div>
                </div>
              </div>
            </DialogContent>
            <div className="btn">
              <Button type="submit">Save Product</Button>
            </div>
          </Form>
        )}
      </Formik>
    </BootstrapDialog>
  );
}

export default FormDialog;
