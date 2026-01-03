import React, { useEffect, useState } from "react";
import { bookRoom, getRoomById } from "../utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import BookingSummary from "./BookingSummary";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Grid,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

const BookingForm = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const currentUser = localStorage.getItem("userId");

  const initialGuestName = currentUser ? currentUser.split("@")[0] : "";

  const [booking, setBooking] = useState({
    guestName: initialGuestName,
    guestEmail: currentUser,
    checkInDate: moment().format("YYYY-MM-DD"),
    checkOutDate: "",
    numberOfAdults: 1,
    numberOfChildren: "",
  });
  //   const [roomInfo, setRoomInfo] = useState({
  //     photo: "",
  //     roomType: "",
  //     roomPrice: "",
  //   });

  const { roomId } = useParams();
  const navigate = useNavigate();

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, "days");
    const price = roomPrice ? roomPrice : 0;
    // console.log(`Price: ${price}, Difference in Days: ${diffInDays}`);
    return diffInDays * price;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Name: ${name}, Value: ${value}`);
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const getRoomPriceById = async (roomId) => {
    try {
      const response = await getRoomById(roomId);
      setRoomPrice(response.roomPrice);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getRoomPriceById(roomId);
  }, [roomId]);

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numberOfAdults);
    // const childrenCount = parseInt(booking.numberOfChildren);
    // const totalCount = adultCount + childrenCount;
    // return totalCount >= 1 && adultCount >= 1;
    return adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (
      !moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))
    ) {
      setErrorMessage("Check-out date must come after check-in date.");
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      !isGuestCountValid() ||
      !isCheckOutDateValid()
    ) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setIsValidated(true);
  };

  const handleBooking = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking);
      setIsSubmitted(true);
      navigate("/booking-success", { state: { message: confirmationCode } });
    } catch (error) {
      setErrorMessage(error.message);
      navigate("/booking-success", { state: { error: errorMessage } });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Reserve Room
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    required
                    fullWidth
                    id="guestName"
                    name="guestName"
                    label="Full Name"
                    type="text"
                    value={booking.guestName}
                    placeholder="Enter your full name"
                    onChange={handleInputChange}
                    error={isValidated && !booking.guestName}
                    helperText={
                      isValidated && !booking.guestName
                        ? "Please enter your fullname"
                        : ""
                    }
                  />

                  <TextField
                    required
                    fullWidth
                    id="guestEmail"
                    name="guestEmail"
                    label="Email"
                    type="email"
                    value={booking.guestEmail}
                    placeholder="Enter your email"
                    onChange={handleInputChange}
                    error={isValidated && !booking.guestEmail}
                    helperText={
                      isValidated && !booking.guestEmail
                        ? "Please enter your email address"
                        : ""
                    }
                  />

                  <Box>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                      Lodging Period
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          required
                          fullWidth
                          id="checkInDate"
                          name="checkInDate"
                          label="Check-In Date"
                          type="date"
                          value={booking.checkInDate}
                          onChange={handleInputChange}
                          InputLabelProps={{ shrink: true }}
                          error={isValidated && !booking.checkInDate}
                          helperText={
                            isValidated && !booking.checkInDate
                              ? "Please select a check-in date"
                              : ""
                          }
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          required
                          fullWidth
                          id="checkOutDate"
                          name="checkOutDate"
                          label="Check-Out Date"
                          type="date"
                          value={booking.checkOutDate}
                          onChange={handleInputChange}
                          InputLabelProps={{ shrink: true }}
                          error={isValidated && !booking.checkOutDate}
                          helperText={
                            isValidated && !booking.checkOutDate
                              ? "Please select a check-out date"
                              : ""
                          }
                        />
                      </Grid>
                    </Grid>
                    {errorMessage && (
                      <Alert severity="error" sx={{ mt: 2 }}>
                        {errorMessage}
                      </Alert>
                    )}
                  </Box>

                  <Box>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                      Number of Guests
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          required
                          fullWidth
                          id="numberOfAdults"
                          name="numberOfAdults"
                          label="Adults"
                          type="number"
                          value={booking.numberOfAdults}
                          onChange={handleInputChange}
                          inputProps={{ min: 1 }}
                          error={isValidated && booking.numberOfAdults < 1}
                          helperText={
                            isValidated && booking.numberOfAdults < 1
                              ? "Please select at least 1 adult"
                              : ""
                          }
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          id="numberOfChildren"
                          name="numberOfChildren"
                          label="Children"
                          type="number"
                          value={booking.numberOfChildren}
                          onChange={handleInputChange}
                          inputProps={{ min: 0 }}
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Continue
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          {isSubmitted && (
            <BookingSummary
              booking={booking}
              isFormValid={isValidated}
              onConfirm={handleBooking}
              calculatePayment={calculatePayment}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookingForm;
