import moment from "moment";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Divider,
  Stack,
} from "@mui/material";

const BookingSummary = ({
  booking,
  isFormValid,
  onConfirm,
  calculatePayment,
}) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numberOfDays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsprocessingPayment] = useState(false);
  const navigate = useNavigate();

  const payment = calculatePayment();

  const handleConfirmBooking = () => {
    setIsprocessingPayment(true);
    setTimeout(() => {
      setIsprocessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Reservation Summary
        </Typography>
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Full Name
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {booking.guestName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {booking.guestEmail}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Check-In Date
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {moment(booking.checkInDate).format("MMM Do YYYY")}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Check-Out Date
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {moment(booking.checkOutDate).format("MMM Do YYYY")}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Number of Days
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {numberOfDays}
            </Typography>
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
              Number of Guests
            </Typography>
            <Typography variant="body1">
              Adult{booking.numberOfAdults > 1 ? "s" : ""}: {booking.numberOfAdults}
            </Typography>
            <Typography variant="body1">
              Children: {booking.numberOfChildren || 0}
            </Typography>
          </Box>
        </Stack>

        {payment > 0 ? (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Total Payment: €{payment}
              </Typography>
            </Box>
            {isFormValid && !isBookingConfirmed ? (
              <Button
                variant="contained"
                color="success"
                fullWidth
                size="large"
                onClick={handleConfirmBooking}
                disabled={isProcessingPayment}
                startIcon={isProcessingPayment && <CircularProgress size={20} />}
              >
                {isProcessingPayment
                  ? "Booking Confirmed, redirecting to payment..."
                  : "Confirm Booking and proceed to payment"}
              </Button>
            ) : isBookingConfirmed ? (
              <Box display="flex" justifyContent="center" alignItems="center" sx={{ py: 2 }}>
                <CircularProgress />
              </Box>
            ) : null}
          </>
        ) : (
          <Alert severity="error" sx={{ mt: 2 }}>
            Check-out date must be after check-in date
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
