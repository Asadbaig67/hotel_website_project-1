import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";
import Googlelogo from "./googlelogo.png";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Signin = () => {
  // code for loader top

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  const googleAuth = async (event) => {
    event.preventDefault();
    const url = `${api}/user/auth/example`;
    const options = {
      method: "GET",
      withCredentials: true,
    };
    const response = await axios(url, options);
    const data = response.data;
  };

  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => {});

  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  // code for loader top
  const theme = createTheme();
  const Navigate = useNavigate();
  const dispatch = useDispatch();

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

  const { activePath } = useSelector((state) => state.activePath);
  const { redirectRoute } = useSelector((state) => state.getRedirectRoute);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // show the loader
    setLoading(true);

    try {
      const response = await axios.post(
        `${api}/user/userlogin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          onUploadProgress: (progressEvent) => {
            // update the progress bar
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(progress);
            setBuffer(progress + 10);
          },
        }
      );

      const data = response.data;
      dispatch({ type: "SET_LOGGEDIN_USER", payload: data });
      dispatch({ type: "SETVIEWTYPE", payload: data.user.account_type });
      dispatch({ type: "LOGIN", payload: true });
      if (response.status === 200) {
        if (redirectRoute === "dashboard") {
          Navigate("/dashboard");
        }
        if (redirectRoute === "/") {
          Navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      // hide the loader
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="buffer"
            value={progress}
            valueBuffer={buffer}
          />
        </Box>
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
              Sign in
            </Typography>
            <Box
              component="form"
              // onSubmit={handleSubmit}
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

              <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  label="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgetpassword">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/signup">Don't have an account? Sign Up</Link>
                </Grid>
              </Grid>
              <Button
                // type="submit"
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
                {/* Wrapped the text in a span element */}
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Signin;
