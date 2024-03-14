import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

DialogConfirmation.propTypes = {
  open: PropTypes.bool,
  onHandleCancel: PropTypes.func,
};

DialogConfirmation.defaultProps = {
  open: false,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogConfirmation(props) {
  const { open, onHandleSubmit, onHandleCancel } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Dialog
        open={open}
        keepMounted
        onClose={onHandleCancel}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>

          <DialogActions>
            <Button onClick={onHandleSubmit}>Select</Button>
            <Button onClick={onHandleCancel}>Cancel</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
