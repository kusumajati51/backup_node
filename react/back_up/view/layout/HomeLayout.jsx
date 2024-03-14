import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import TopBarMenu from '../component/bar/TopBarMenu.jsx';
import { styled, useTheme } from "@mui/material/styles";
import useToken from "../../auth/token.jsx";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

export const HomeLayout = (props) => {
  const { token, setToken } = useToken()

  if (!token) {
    console.log(token);
    return <Navigate to="/auth/login" />;
  }


  return (
    <Box sx={{ display: "flex" }}>
      <TopBarMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
};

export default HomeLayout;
