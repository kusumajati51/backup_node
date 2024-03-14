import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  createTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import PropTypes from "prop-types";
import { useState } from "react";

const theme = createTheme({
  spacing: 4,
});

const useStyles = makeStyles({
  root: {
    background: "#FAF3EC",
    width: "auto",
    position: "absolute",
    top: "calc(50% - 240px)",
    left: "calc(40% - 160px)",
  },
  formImage: {
    boxShadow: "0 0 10px",
    backgroundColor: "white",
    width: "500px",
    height: "500px",
    display: "flex",
    flexWrap: "wrap",
    // border-radius:'15px 15px 15px 15px',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  divForm: {
    width: "90%",
  },
  image: {
    width: "90%",
    height: "35%",
    margin: "8px",
  },
  paperRoot: {
    margin: 8,
  },
});

DialogUploadPhoto.propTypes = {
  open: PropTypes.bool,
  onHandleCancel: PropTypes.func,
  onHandleSubmit: PropTypes.func,

};

export default function DialogUploadPhoto(props) {
  const { open, onHandleSubmit, onHandleCancel } = props;
  const [files, setFile] = useState('');
  const [url, setUrl] = useState('')
  const classes = useStyles();

  function handleFileUpload(e) {
    let url = URL.createObjectURL(e.target.files[0]);
    setUrl(url)
    setFile(e.target.files[0]);
    console.log(url);
  }

  function setData(e) {
    const data = new FormData();
    data.append(`file`, files, files.name);
    onHandleSubmit(data);
  }
  return (
    <>
      <Dialog open={open} onClose={onHandleCancel}>
        <DialogTitle>Add Picture </DialogTitle>

        <DialogContent>
          <div className={classes.divForm}>
            <TextField
              id="outlined-full-width"
              label="Image Upload"
              style={{ margin: 8 }}
              name="upload-photo"
              type="file"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleFileUpload}
            />
            {url.length > 0 && (
              <Card className={classes.paperRoot}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={url}
                    title="Contemplative Reptile"
                  />
                </CardActionArea>
              </Card>
            )}
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={setData}>Select</Button>
          <Button onClick={onHandleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
