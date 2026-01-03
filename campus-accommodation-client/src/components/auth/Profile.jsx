import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  deleteUser,
  getBookingsByUserId,
  getUser,
} from "../utils/ApiFunctions";
import {
  Container,
  Box,
  Typography,
  Button,
  Alert,
  Card,
  CardContent,
  Avatar,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Stack,
  Chip,
} from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    roles: [{ id: "", name: "" }],
  });

  const [bookings, setBookings] = useState({
    id: "",
    room: { id: "", roomType: "" },
    checkInDate: "",
    checkOutDate: "",
    bookingConfirmationCode: "",
  });

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId, token);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsByUserId(userId, token);
        setBookings(response);
      } catch (error) {
        console.error("Error fetching bookings: ", error.message);
        setErrorMessage(error.message);
      }
    };
    fetchBookings();
  }, [userId]);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      await deleteUser(userId)
        .then((response) => {
          setMessage(response.data);
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("userRole");
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          setErrorMessage(error.data);
        });
    }
  };

  if (!user.id) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}
      {message && (
        <Alert severity="info" sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4, textAlign: "center" }}>
            User Information
          </Typography>

          <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
            <Avatar
              src="https://themindfulanimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
              alt="Profile"
              sx={{ width: 150, height: 150 }}
            />
          </Box>

          <Stack spacing={2} sx={{ maxWidth: 800, mx: "auto" }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                ID
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {user.id}
              </Typography>
              <Divider sx={{ mt: 1 }} />
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                First Name
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {user.firstName}
              </Typography>
              <Divider sx={{ mt: 1 }} />
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                Last Name
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {user.lastName}
              </Typography>
              <Divider sx={{ mt: 1 }} />
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {user.email}
              </Typography>
              <Divider sx={{ mt: 1 }} />
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Roles
              </Typography>
              <Stack direction="row" spacing={1}>
                {user.roles && user.roles.length > 0 ? (
                  user.roles.map((role) => (
                    <Chip key={role.id} label={role.name} color="primary" />
                  ))
                ) : (
                  <Typography variant="body1">No roles assigned</Typography>
                )}
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: "center" }}>
            Booking History
          </Typography>

          {bookings.length > 0 ? (
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Booking ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Room ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Room Type</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Check In Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Check Out Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Confirmation Code</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.map((booking, index) => (
                    <TableRow key={index}>
                      <TableCell>{booking.bookingId}</TableCell>
                      <TableCell>{booking.room.id}</TableCell>
                      <TableCell>{booking.room.roomType}</TableCell>
                      <TableCell>
                        {moment(booking.checkInDate)
                          .subtract(1, "month")
                          .format("MMM Do, YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(booking.checkOutDate)
                          .subtract(1, "month")
                          .format("MMM Do, YYYY")}
                      </TableCell>
                      <TableCell>{booking.bookingConfirmationCode}</TableCell>
                      <TableCell>
                        <Chip label="On-going" color="success" size="small" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography align="center" color="text.secondary">
              You have not made any bookings yet.
            </Typography>
          )}
        </CardContent>
      </Card>

      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteAccount}
        >
          Close Account
        </Button>
      </Box>
    </Container>
  );
};

export default Profile;
