import { parseISO, format } from "date-fns";
import React, { useEffect, useState } from "react";
import DateSlider from "../common/DateSlider";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const BookingTable = ({ bookingInfo, handleBookingCancellation }) => {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

  const filterBookings = (startDate, endDate) => {
    let filtered = bookingInfo;
    if (startDate && endDate) {
      filtered = bookingInfo.filter((booking) => {
        // Parse dates, handling both string and Date object formats
        const bookingStartDate = typeof booking.checkInDate === 'string' 
          ? parseISO(booking.checkInDate) 
          : new Date(booking.checkInDate);
        const bookingEndDate = typeof booking.checkOutDate === 'string'
          ? parseISO(booking.checkOutDate)
          : new Date(booking.checkOutDate);
        
        // Normalize dates to midnight for proper comparison
        const filterStart = new Date(startDate);
        filterStart.setHours(0, 0, 0, 0);
        const filterEnd = new Date(endDate);
        filterEnd.setHours(23, 59, 59, 999);
        
        const bookingStart = new Date(bookingStartDate);
        bookingStart.setHours(0, 0, 0, 0);
        const bookingEnd = new Date(bookingEndDate);
        bookingEnd.setHours(0, 0, 0, 0);
        
        // Check if booking overlaps with the selected date range
        return (
          (bookingStart >= filterStart && bookingStart <= filterEnd) ||
          (bookingEnd >= filterStart && bookingEnd <= filterEnd) ||
          (bookingStart <= filterStart && bookingEnd >= filterEnd)
        );
      });
    }
    setFilteredBookings(filtered);
  };

  useEffect(() => {
    setFilteredBookings(bookingInfo);
  }, [bookingInfo]);

  return (
    <Box>
      <DateSlider
        onDateChange={filterBookings}
        onFilterChange={filterBookings}
      />

      {filteredBookings.length === 0 ? (
        <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
          No bookings found for the selected dates
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 600 }}>S/N</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Booking ID</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Room ID</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Room Type</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Check-In Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Check-Out Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Guest Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Guest Email</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Adults</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Children</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Total Guests</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Confirmation Code</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBookings.map((booking, index) => {
                // Format dates for display
                const formatDate = (dateString) => {
                  try {
                    const date = typeof dateString === 'string' 
                      ? parseISO(dateString) 
                      : new Date(dateString);
                    return format(date, 'MMM dd, yyyy');
                  } catch (error) {
                    return dateString;
                  }
                };

                return (
                  <TableRow
                    key={booking.bookingId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{booking.bookingId}</TableCell>
                    <TableCell align="center">{booking.room.id}</TableCell>
                    <TableCell align="center">{booking.room.roomType}</TableCell>
                    <TableCell align="center">{formatDate(booking.checkInDate)}</TableCell>
                    <TableCell align="center">{formatDate(booking.checkOutDate)}</TableCell>
                    <TableCell align="center">{booking.guestFullName}</TableCell>
                    <TableCell align="center">{booking.guestEmail}</TableCell>
                    <TableCell align="center">{booking.numOfAdults}</TableCell>
                    <TableCell align="center">{booking.numOfChildren}</TableCell>
                    <TableCell align="center">{booking.totalNumOfGuest}</TableCell>
                    <TableCell align="center">{booking.bookingConfirmationCode}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleBookingCancellation(booking.bookingId)}
                        title="Cancel Booking"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default BookingTable;
