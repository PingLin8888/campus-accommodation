import React, { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/ApiFunctions";
import { useAuth } from "./AuthProvider";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  Link,
} from "@mui/material";

const Login = ({ setIsLoggedIn }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirecUrl = location.state?.path || "/";

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(login);
    if (success) {
      const token = success.token;
      const role = success.userRole;
      auth.handleLogin(token);
      navigate("/", { state: { justLoggedIn: true } });
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          Login
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ width: "100%", mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              value={login.email}
              onChange={handleInputChange}
              required
              autoComplete="email"
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={login.password}
              onChange={handleInputChange}
              required
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
            >
              Login
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" component="span">
                Don't have an account yet?{" "}
                <Link component={RouterLink} to="/register">
                  Register
                </Link>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
