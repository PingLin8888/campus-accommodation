import React, { useState } from "react";
import { userRegistration } from "../utils/ApiFunctions";
import { Link as RouterLink } from "react-router-dom";
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

const Registration = () => {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const result = await userRegistration(registration);
      setSuccessMessage(result);
      setErrorMessage("");
      setRegistration({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Registration error: ${error.message}`);
    }
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
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
          Register
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ width: "100%", mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ width: "100%", mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleRegistration} sx={{ width: "100%" }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              variant="outlined"
              id="firstName"
              name="firstName"
              label="First Name"
              type="text"
              value={registration.firstName}
              onChange={handleInputChange}
              required
              autoComplete="given-name"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              fullWidth
              variant="outlined"
              id="lastName"
              name="lastName"
              label="Last Name"
              type="text"
              value={registration.lastName}
              onChange={handleInputChange}
              required
              autoComplete="family-name"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              fullWidth
              variant="outlined"
              id="email"
              name="email"
              label="Email"
              type="email"
              value={registration.email}
              onChange={handleInputChange}
              required
              autoComplete="email"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              fullWidth
              variant="outlined"
              id="password"
              name="password"
              label="Password"
              type="password"
              value={registration.password}
              onChange={handleInputChange}
              required
              autoComplete="new-password"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button
            type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
          >
            Register
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" component="span">
                Already have an account?{" "}
                <Link component={RouterLink} to="/login">
                  Login
                </Link>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Registration;
