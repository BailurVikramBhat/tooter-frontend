import {
  Button,
  Avatar,
  Box,
  Container,
  Typography,
  CssBaseline,
  TextField,
  InputAdornment,
  Grid,
  Link,
  Alert,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
interface RegisterError {
  data: { message: string };
}
const Register = () => {
  const { setIsLoggedIn } = useContext(LoginContext);
  const [pwVisible, setPwVisible] = useState<boolean>(false);
  const [confirmPwVisible, setConfirmPwVisible] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [serverError, setServerError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  //   const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  //   if (loginSuccess) {
  //   navigate("/home");
  //   }
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    if (value.includes(" ")) {
      setUsernameError("no spaces allowed");
    } else {
      setUsernameError("");
      setUsername(event.target.value);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    setPassword(value);
    if (value !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
    }
    if (value.length < 6) {
      setPasswordError("password should be at least 6 characters");
    } else if (value.includes(" ")) {
      setPasswordError("no spaces allowed");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    if (event.target.value !== password) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<NonNullable<unknown>, RegisterError>(
        "http://localhost:8080/api/users/register",
        {
          username,
          password,
        }
      );
      console.log(response.data);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          setUsernameError("Username already exists");
        }
      } else {
        // Handle other types of errors
        // setError({ message: "An unexpected error occurred." });
        console.log("other error:");
        setServerError(true);
      }
    }
  };
  const toggleVisibility = (type: string) => {
    if (type === "password") setPwVisible(!pwVisible);
    else setConfirmPwVisible(!confirmPwVisible);
  };
  return (
    <div>
      <Container
        maxWidth="xs"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CssBaseline />
        <Box
          sx={{
            margin: "2rem",
            // border: "5px solid red",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            {serverError && (
              <Alert
                variant="filled"
                severity="error"
              >
                Server is down! We apologize
              </Alert>
            )}
          </div>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
          >
            Register!
          </Typography>
          <Typography variant="caption">
            Get started with your Tooter Account right away!
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            method="post"
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              required
              error={!!usernameError}
              margin="normal"
              fullWidth
              helperText={!usernameError ? "must be unique" : usernameError}
              type="text"
              id="username"
              label="username"
              name="username"
              placeholder="enter your username"
              onChange={handleUsernameChange}
            />
            <TextField
              required
              margin="normal"
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError}
              fullWidth
              type={pwVisible ? "text" : "password"}
              id="password"
              label="password"
              name="password"
              placeholder="enter your password"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => toggleVisibility("password")}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    {pwVisible ? <Visibility /> : <VisibilityOff />}
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              required
              margin="normal"
              fullWidth
              onChange={handleConfirmPasswordChange}
              type={confirmPwVisible ? "text" : "password"}
              id="confirm-password"
              label="confirm password"
              name="confirm-password"
              placeholder="re-enter your password"
              error={!!errorMessage}
              helperText={errorMessage}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => toggleVisibility("confirm-password")}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    {confirmPwVisible ? <Visibility /> : <VisibilityOff />}
                  </InputAdornment>
                ),
              }}
            />
            <Button
              sx={{ marginTop: "1rem" }}
              variant="contained"
              fullWidth
              type="submit"
              disabled={
                !username ||
                !password ||
                !confirmPassword ||
                !!errorMessage ||
                !!usernameError ||
                !!passwordError
              }
            >
              Register
            </Button>
            <Grid
              container
              sx={{ marginTop: "1rem", gap: "0.5rem" }}
            >
              <Grid
                item
                md
              >
                <Link
                  href="#"
                  variant="body2"
                  sx={{ textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  sx={{ textDecoration: "none" }}
                >
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
