import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

const Changepassword = () => {
  const Navigate = useNavigate();
  const theme = createTheme();
  const dispatch = useDispatch();
  const { userWithToken } = useSelector((state) => state.getResetToken);
  const email = userWithToken.email;

  const [alertOn, setAlertOn] = useState(false);
  const [alertErrorOn, setAlertErrorOn] = useState(false);
  const [open, setOpen] = useState(true);
  const [openError, setOpenError] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("Success!");

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

  const [newpassword, setPassword] = useState("");
  const [cnewpassword, setCpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  const handleCpasswordChange = (event) => {
    setCpassword(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowCPassword = () => {
    setShowCPassword(!showCPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://46.32.232.208:5000/otp/resetpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newpassword, cnewpassword }),
    });
    const data = await response.json();
    if (response.status === 401) {
      setAlertType("error");
      setAlertTitle("Failed!");
      setAlertMessage("Verification Failed, Please Retry!");
      setAlertOn(true);
    }
    if (!response.ok) {
      setAlertType("error");
      setAlertTitle("Failed!");
      setAlertMessage("Cannot Reset Password!");
    }
    if (data) {
      setAlertType("info");
      setAlertTitle("Password Update Success!");
      setAlertMessage(
        "Password Updated Successfully! You are being redirected to Signin Page"
      );
      setAlertOn(true);
      
      setTimeout(() => {
        Navigate("/Signin");
      }, 5000);
    }
  };

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
              <AlertTitle>{alertTitle}</AlertTitle>
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
              Set New Password
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
                name="newpassword"
                label="New Password"
                value={newpassword}
                onChange={handlePasswordChange}
                type={showPassword ? "text" : "password"}
                id="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword} edge="end">
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="cnewpassword"
                label="Confirm New Password"
                value={cnewpassword}
                onChange={handleCpasswordChange}
                type="password"
                id="cpassword"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowCPassword} edge="end">
                        {showCPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                //   autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onSubmit={handleSubmit}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default Changepassword;
