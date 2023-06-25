import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";

const Forgetpass = () => {
  const Navigate = useNavigate();
  const theme = createTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.getLoggedInUser);
  const [alertOn, setAlertOn] = useState(false);
  const [open, setOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");
  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link to="/">Client website.com</Link> {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const [email, setEmail] = useState("");
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${api}/otp/sendotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (response.status === 404) {
      setAlertMessage("Email Not Exist");
      setAlertType("error");
      setAlertOn(true);
    } else if (response.status === 409) {
      setAlertMessage(
        "Email Already Sent To Your Email! Please Check Your Email Inbox!"
      );
      setAlertOn(true);
    } else if (response.status === 500) {
      setAlertType("error");
      setAlertMessage("Server Error");
      setAlertOn(true);
    } else if (response.status === 200) {
      setAlertType("info");
      setAlertMessage(
        "Please check your email inbox for a link to complete the reset!"
      );
      setAlertOn(true);
      const data = await response.json();
      dispatch({ type: "SET_USER_TOKEN", payload: data.user });
      // setTimeout(() => {
      //   setAlertOn(false);
      // }, 5000);
    }
  };

  useEffect(() => {
    if (alertMessage && alertType) {
      setAlertOn(true);
    }
  }, [alertMessage, alertType]);

  return (
    <>
      {alertOn && (
        <Collapse in={open}>
          <Stack sx={{ width: "100%" }} spacing={1}>
            <Alert
              sx={{
                borderRadius: "9999px", // make the alert appear as a pill shape
                transition: "transform 0.3s ease-in-out", // add a transition effect
                transform: open ? "scale(1)" : "scale(0.7)", // scale the alert based on the open state
                mt: 2,
                ml: 2,
                mr: 2,
              }}
              severity={alertType}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                  sx={{ mt: 1.5 }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>Reset Password</AlertTitle>
              <strong>{alertMessage}!</strong>
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
              Reset Password
            </Typography>
            <small className="text-center my-5 text-muted">
              To reset your password, enter your email below and submit. An
              email will be sent to you with instructions about how to complete
              the process.
            </small>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                value={email}
                onChange={handleEmailChange}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onSubmit={handleSubmit}
                // disabled={}
              >
                Verify Email
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};
export default Forgetpass;
