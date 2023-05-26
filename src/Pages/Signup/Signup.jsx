import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useState } from "react";
import Googlelogo from "../Signin/googlelogo.png";
import { useDispatch } from "react-redux";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to="/">Your Website</Link> {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [c_password, setCpassword] = useState("");
  const [account_type, setAccountType] = useState("user");
  const [alertOn, setAlertOn] = useState(false);
  const [open, setOpen] = useState(true);

  const googleAuth = async () => {
    // const url = `http://localhost:5000/user/google`;
    // const options = {
    //   method: "GET",
    //   headers: {
    //     withCredentials: true,
    //     // "Content-Type": "application/json",
    //   },
    // };

    // try {
    //   const response = await fetch(url, options);
    //   if (response.ok) {
    //     const { user } = await response.json();
    //     // Dispatch action to set the logged-in user
    //     dispatch({ type: "SET_LOGGEDIN_USER", payload: user });

    //     console.log("User:", user);
    //   } else {
    //     // Handle error case
    //     console.error("Authentication failed:", response.statusText);
    //   }
    // } catch (error) {
    //   // Handle network or other errors
    //   console.error("Error during authentication:", error);
    // }

    window.open(`http://localhost:5000/user/google`);
  };

  const handleOnclik = async (event) => {
    console.log("clicked");
    event.preventDefault();
    const response = await fetch("http://localhost:5000/user/registeration", {
      method: "POST",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        account_type,
        password,
        c_password,
      }),
    });
    const data = await response.json();
    if (data) {
      setAlertOn(true);
    }
    console.log(data);
    // dispatch({ type: "SET_LOGGEDIN_USER", payload: data });
  };

  // console.log(email, password, firstName, lastName);

  return (
    <>
      {alertOn && (
        <Collapse in={open}>
          <Stack sx={{ width: "100%" }} spacing={1}>
            <Alert
              severity="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>Info</AlertTitle>
              This is an info alert —{" "}
              <strong>
                A verification email is sent to email <i>'{email}'</i> please
                verify!
              </strong>
            </Alert>
          </Stack>
        </Collapse>
      )}

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                  <TextField
                    className="mt-3"
                    required
                    fullWidth
                    name="cpassword"
                    label="Confirm Password"
                    onChange={(e) => {
                      setCpassword(e.target.value);
                    }}
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleOnclik}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/signin">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                size="larger"
                // color="secondary"
                onClick={googleAuth}
                sx={{
                  mt: 3,
                  mb: 2,
                  pt: 1,
                  pb: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }} // Added display and alignItems properties
              >
                <img
                  src={Googlelogo}
                  style={{
                    objectFit: "cover",
                    height: "35px",
                    width: "35px",
                  }}
                  alt=""
                />
                <span className="mx-auto">Continue with Google</span>{" "}
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
