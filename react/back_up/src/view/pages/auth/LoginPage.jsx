import {
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Stack,
  Button,
  TextField,
  Link
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { api } from "../../../service/api/axios";
import AuthLayout from "../../layout/AuthLayout.jsx";
import { Navigate, redirect, useNavigate } from "react-router-dom";

export default function LoginPage({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataLogin = {
      email,
      password
    };
    api
      .post("/auth/login", dataLogin)
      .then( (res) => {
        let token = res.token;

        localStorage.setItem('token', "Bearer " + token);
        return navigate('/')
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
              width: 500
            }}
          >
            <Stack component="form" spacing={2} onSubmit={ handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: "16px" }}
              >
                Sign In
              </Button>

              <Link href={"register"} underline="hover">
                {"Register"}
              </Link>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
