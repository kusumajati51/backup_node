import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

DialogAddProduct.propTypes = {
  open: PropTypes.bool,
};
export default function DialogAddProduct(props) {
  const { open, onHandleSubmit, onHandleClose } = props;

  const [nameProduct, setNameProduct] = useState("");
  const [codeProduct, setCodeProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState(0);
  const createOnSubmit = (event) =>  {
    const product = {
      name : nameProduct,
      code_product: codeProduct,
      price: priceProduct
    }
    onHandleSubmit(product)
  }
  return (
    <>
      <Dialog open={open} onClose={onHandleClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name Product"
            type="text"
            onChange={(e)=>{setNameProduct(e.target.value)}}
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="code_product"
            label="Code Product"
            type="text"
            fullWidth
            onChange={(e)=>{setCodeProduct(e.target.value)}}
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price Product"
            type="number"
            onChange={(e)=>{setPriceProduct(e.target.value)}}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onHandleClose}>Cancel</Button>
          <Button onClick={createOnSubmit}>Success</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
