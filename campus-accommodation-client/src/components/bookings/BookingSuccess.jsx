import React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Alert,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const BookingSuccess = () => {
  const location = useLocation();
  const message = location.state?.message;
  const error = location.state?.error;

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <Card sx={{ width: "100%", mt: 4 }}>
          <CardContent sx={{ p: 4 }}>
            {message ? (
              <Stack spacing={3} alignItems="center">
                <CheckCircleIcon
                  color="success"
                  sx={{ fontSize: 80 }}
                />
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  color="success.main"
                  sx={{ fontWeight: 600 }}
                >
                  Booking Successful!
                </Typography>
                <Alert severity="success" sx={{ width: "100%" }}>
                  <Typography variant="body1">
                    {message}
                  </Typography>
                </Alert>
                <Typography variant="body1" align="center" color="text.secondary">
                  A confirmation email has been sent to your registered email address.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/profile"
                  >
                    View My Bookings
                  </Button>
                  <Button
                    variant="outlined"
                    component={RouterLink}
                    to="/"
                  >
                    Back to Home
                  </Button>
                </Stack>
              </Stack>
            ) : (
              <Stack spacing={3} alignItems="center">
                <ErrorIcon
                  color="error"
                  sx={{ fontSize: 80 }}
                />
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  color="error.main"
                  sx={{ fontWeight: 600 }}
                >
                  Booking Failed
                </Typography>
                <Alert severity="error" sx={{ width: "100%" }}>
                  <Typography variant="body1">
                    {error || "An error occurred while processing your booking. Please try again."}
                  </Typography>
                </Alert>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/browse-all-rooms"
                  >
                    Browse Rooms
                  </Button>
                  <Button
                    variant="outlined"
                    component={RouterLink}
                    to="/"
                  >
                    Back to Home
                  </Button>
                </Stack>
              </Stack>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default BookingSuccess;
