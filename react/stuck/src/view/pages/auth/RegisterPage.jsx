import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Link
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { api } from "../../../service/api/axios";
import AuthLayout from "../../layout/AuthLayout.jsx";

export default class RegisterPage extends React.Component {
  render() {
    const gender = ["male", "female"];
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const dataLogin = {
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        phoneNumber: data.get("phoneNumber"),
        gender: data.get("gender")
      };
      console.log(dataLogin);
      api
        .post("/auth/signup", dataLogin)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error.response);
        });
    };
    return (
      <AuthLayout>
        <Card sx={{ borderRadius: "16px" }}>
          <CardContent>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%"
              }}
            >
              <Stack component="form" spacing={2} onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="number"
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  select
                  id="gender"
                  label="Select"
                  name="gender"
                  helperText="Please select your gender"
                  autoFocus
                >
                  {gender.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, borderRadius: "16px" }}
                >
                  Register
                </Button>
                <Link href={"login"} underline="hover">
                  {"Login"}
                </Link>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </AuthLayout>
    );
  }
}
