import {
    Box,
    Container,
    CssBaseline,
    Grid,
    Paper,
    Avatar,
    Typography,
    Toolbar,
    AppBar,
    Divider,
    Button,
    Stack
} from "@mui/material";
import background from "../../assets/background/auth/auth_blue.jpeg";
import React from "react";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {red} from "@mui/material/colors";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {styled} from "@mui/material/styles";
import {Navigate} from "react-router-dom";
import useToken from "../../auth/token.jsx";

const theme = createTheme();

const stylesAuth = {
    maxWidth: "100vw",
    maxHeight: "100vh",
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#2ABCEF",
    flexDirection: "column"
};
const navItems = ["Home", "About", "Contact"];

const StyledContent = styled("div")(({theme}) => ({
    maxWidth: 700,
    width: "100vw",
    margin: "auto",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(12, 5)
}));

const StyledRoot = styled("div")(({theme}) => ({
    [theme.breakpoints.up("md")]: {
        display: "flex"
    }
}));

const StyledSection = styled("div")(({theme}) => ({
    width: "80%",
    maxWidth: 480,
    display: "flex",
    backgroundColor: theme.palette.background.default
}));
export default function AuthLayout(props) {
    const {token, setToken} = useToken()

    if (token) {
        console.log(token);
        return <Navigate to="/"/>;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <StyledRoot
                container
                component="main"
                sx={{height: "100vh", backgroundColor: "#2ABCEF"}}
            >
                <Container maxWidth="sm">
                    <StyledContent>
                        <Stack alignItems="flex-start" justifyContent="flex-start">
                            <Typography
                                variant="h3"
                                gutterBottom
                                sx={{fontWeight: "bold", color: "#000"}}
                            >
                                POS KITA
                            </Typography>
                            <Typography
                                variant="h3"
                                gutterBottom
                                sx={{fontWeight: "bold", color: "#000"}}
                            >
                                CORPORATION
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{fontWeight: "bold", color: "#fff"}}
                            >
                                YOUR TRUST INVENTORY MANAGEMENT SYSTEM
                            </Typography>
                            <Box
                                sx={{
                                    marginTop: 10
                                }}
                            >
                                {props.children}
                            </Box>
                        </Stack>
                    </StyledContent>
                </Container>
                <StyledSection sx={stylesAuth}>
                    <AppBar
                        elevation={0}
                        position="absolute"
                        sx={{backgroundColor: "#22B9EC"}}
                    >
                        <Toolbar>
                            <Box
                                variant="h6"
                                component="div"
                                sx={{flexGrow: 1, display: {xs: "none", sm: "block"}}}
                            />
                            <Box sx={{display: {xs: "none", sm: "block"}}}>
                                {navItems.map((item) => (
                                    <Button
                                        variant="text"
                                        key={item}
                                        sx={{fontSize: "18px", fontWeight: "bold", color: "#000"}}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <Container>
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <Typography
                                sx={{fontWeight: "bold", color: "#000", marginTop: 10}}
                            >
                                LOGO
                            </Typography>
                        </Stack>
                    </Container>
                </StyledSection>
            </StyledRoot>
        </ThemeProvider>
    );
}
