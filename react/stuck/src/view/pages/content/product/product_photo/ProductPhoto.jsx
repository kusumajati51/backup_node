import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomeLayout from "../../../../layout/HomeLayout";
import { api, apiUpload } from "../../../../../service/api/axios";
import { withRouter } from "../../../../../routes/withParams";
import DialogConfirmation from "../../../../component/dialog/DialogConfirmations";
import DialogUploadPhoto from "../../../../component/dialog/DialogUploadPhoto";

class PhotoProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      openSelect: false,
      openUpload: false,
      selectId: 0,
    };
  }

  componentDidMount() {
    this.getListPicture();
  }
  getListPicture() {
    let id = this.props.params.id;
    api
      .get(`/product/photo/index/${id}`)
      .then((response) => {
        this.setState({
          cards: response,
        });
      })
      .catch((err) => {});
  }

  async selectPicture(id) {
    this.state.id = id;
    this.handleDialogSelect();
  }

  handleDialogSelect = async () => {
    await this.setState({
      openSelect: !this.state.openSelect,
    });
  };

  handleDialogUpload = async (event) => {
    await this.setState({
      openUpload: !this.state.openUpload,
    });
  };

  submitPicture = async () => {
    api
      .patch(`/product/photo/select/${this.state.id}`)
      .then((response) => {
        console.log(response);
        this.handleDialogSelect();
      })
      .catch((err) => {
        console.log(err);
        this.handleDialogSelect();
      });
  };
  uploadPicture = (id) => (data) => {
    console.log(data);
    apiUpload
      .post(`/product/photo/${id}`, data)
      .then((response) => {
        console.log(response);
        this.handleDialogUpload();
      })
      .catch((err) => {
        console.log(err);
        this.handleDialogUpload();
      });
  };
  render() {
    return (
      <HomeLayout>
        <Button onClick={this.handleDialogUpload}>New Product</Button>'
        <DialogConfirmation
          open={this.state.openSelect}
          onHandleCancel={this.handleDialogSelect}
          onHandleSubmit={this.submitPicture}
        />
        <DialogUploadPhoto
          open={this.state.openUpload}
          onHandleCancel={this.handleDialogUpload}
          onHandleSubmit={this.uploadPicture(this.props.params.id)}
        />
        <main>
          <Container sx={{ py: 2 }} maxWidth="md">
            <Grid container spacing={4}>
              {this.state.cards.map((card) => (
                <Grid item key={card.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={
                        import.meta.env.VITE_API_URL +
                        "product/photo/picture/" +
                        card.id
                      }
                      alt="random"
                    />
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          this.selectPicture(card.id);
                        }}
                      >
                        Select
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </HomeLayout>
    );
  }
}

const ProductPhoto = withRouter(PhotoProduct);

export default ProductPhoto;
