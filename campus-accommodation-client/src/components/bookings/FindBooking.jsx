import React, { useState } from "react";
import {
  cancelBooking,
  getBookingByConfirmationCode,
} from "../utils/ApiFunctions";
import { format, parseISO } from "date-fns";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Stack,
  Grid,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [successCancellMessage, setSuccessCancellMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    bookingId: "",
    room: "",
    bookingConfirmationCode: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuest: "",
  });
  const [isDeleted, setIsDeleted] = useState(false);

  const clearBookingInfo = {
    bookingId: "",
    room: "",
    bookingConfirmationCode: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuest: "",
  };

  const handleInputChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await getBookingByConfirmationCode(confirmationCode);
      setBookingInfo(data);
      setError(null);
    } catch (error) {
      setBookingInfo(clearBookingInfo);
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
    setTimeout(() => {
      setIsLoading(false);
      setIsDeleted(false);
    }, 2000);
  };

  const handleBookingCancellation = async (bookingId) => {
    try {
      //   console.log(bookingInfo);
      await cancelBooking(bookingInfo.bookingId);
      setIsDeleted(true);
      setBookingInfo(clearBookingInfo);
      setConfirmationCode("");
      setError("");
      setSuccessCancellMessage("Booking has been cancelled successfully");
    } catch (error) {
      setError(error.message);
    }
    // setTimeout(() => {
    //   setSuccessCancellMessage("");
    // }, 2000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      // If it's already a string in a readable format, try to parse it
      if (typeof dateString === "string" && dateString.includes("-")) {
        return format(parseISO(dateString), "MMM dd, yyyy");
      }
      // If it's a Date object
      if (dateString instanceof Date) {
        return format(dateString, "MMM dd, yyyy");
      }
      // Otherwise return as is
      return dateString;
    } catch (error) {
      console.error("Date formatting error:", error);
      return dateString;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
          Find My Booking
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter your confirmation code to view or cancel your booking
        </Typography>
      </Box>

      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Box component="form" onSubmit={handleFormSubmit}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                variant="outlined"
                id="confirmationCode"
                name="confirmationCode"
                value={confirmationCode}
                onChange={handleInputChange}
                placeholder="Enter your booking confirmation code"
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SearchIcon />}
                disabled={isLoading}
                sx={{ minWidth: 150 }}
              >
                Find
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center" py={4}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Finding your booking...</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {isDeleted && (
        <Alert
          severity="success"
          icon={<CheckCircleIcon />}
          sx={{ mb: 3 }}
        >
          {successCancellMessage}
        </Alert>
      )}

      {bookingInfo.bookingConfirmationCode && !isLoading && (
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Booking Information
            </Typography>

            <Alert severity="success" sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Confirmation Code: {bookingInfo.bookingConfirmationCode}
              </Typography>
            </Alert>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Room Number
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {bookingInfo.room.id}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Room Type
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {bookingInfo.room.roomType}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Check-in Date
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatDate(bookingInfo.checkInDate)}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Check-out Date
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatDate(bookingInfo.checkOutDate)}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Guest Name
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {bookingInfo.guestFullName}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Email Address
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {bookingInfo.guestEmail}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Adults
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {bookingInfo.numOfAdults}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Children
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {bookingInfo.numOfChildren}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Total Guests
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {bookingInfo.totalNumOfGuest}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {!isDeleted && (
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  startIcon={<CancelIcon />}
                  onClick={() => handleBookingCancellation(bookingInfo.bookingId)}
                >
                  Cancel Booking
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default FindBooking;
