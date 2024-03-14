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

DialogAddSku.propTypes = {
  open: PropTypes.bool,
  onHandleSubmit: PropTypes.func,
  onHandleClose: PropTypes.func,
};

export default function DialogAddSku(props) {
  const { open, onHandleSubmit, onHandleClose } = props;

  const [nameSku, setNameSku] = useState("");
  const [unitSku, setUnit] = useState("");
  const [price, setPrice] = useState(0);

  const createOnSubmit = (event) => {
    const sku = {
      name: nameSku,
      unit: unitSku,
      price: price,
    };
    onHandleSubmit(sku);
  };
  return (
    <>
      <Dialog open={open} onClose={onHandleClose}>
        <DialogTitle>Add Sku</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name SKU"
            type="text"
            onChange={(e) => {
              setNameSku(e.target.value);
            }}
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="code_product"
            label="Unit SKU"
            type="text"
            fullWidth
            onChange={(e) => {
              setUnit(e.target.value);
            }}
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="number"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
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
