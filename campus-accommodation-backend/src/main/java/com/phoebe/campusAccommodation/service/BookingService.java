package com.phoebe.campusAccommodation.service;

import com.phoebe.campusAccommodation.exception.InvalidBookingRequestException;
import com.phoebe.campusAccommodation.exception.ResourceNotFoundException;
import com.phoebe.campusAccommodation.model.Booking;
import com.phoebe.campusAccommodation.model.Room;
import com.phoebe.campusAccommodation.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomService roomService;

    public List<Booking> getAllBookingsByRoomId(Long RoomId) {
        return bookingRepository.findByRoomId(RoomId);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking findByBookingConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode).orElseThrow(() -> new ResourceNotFoundException("No booking found with confirmation code: " + confirmationCode));
    }

    public String saveBooking(long roomId, Booking bookingRequest) {
        if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
            throw new InvalidBookingRequestException("Check-in date must come before check-out date");
        }
        Room room = roomService.getRoomById(roomId).get();
        List<Booking> bookings = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest, bookings);
        if (roomIsAvailable) {
            room.addBooking(bookingRequest);
            bookingRepository.save(bookingRequest);
        }else{
            throw new InvalidBookingRequestException("Sorry. This room is not available for the selected dates.");
        }
        return bookingRequest.getBookingConfirmationCode();
    }

    private boolean roomIsAvailable(Booking bookingRequest, List<Booking> bookings) {
        return bookings.stream().noneMatch(booking ->
//                    bookingRequest.getCheckInDate().equals(booking.getCheckInDate())
//                    || bookingRequest.getCheckOutDate().isBefore(booking.getCheckOutDate())
//                    || bookingRequest.getCheckInDate().isAfter(booking.getCheckInDate())
//                    && bookingRequest.getCheckInDate().isBefore(booking.getCheckOutDate())
//                    || bookingRequest.getCheckInDate().isBefore(booking.getCheckInDate())
//
//                    && bookingRequest.getCheckOutDate().equals(booking.getCheckOutDate())
//                    || bookingRequest.getCheckInDate().isBefore(booking.getCheckInDate())
//
//                    && bookingRequest.getCheckOutDate().isAfter(booking.getCheckOutDate())
//
//                    || bookingRequest.getCheckInDate().equals(booking.getCheckOutDate())
//                    && bookingRequest.getCheckOutDate().equals(booking.getCheckInDate())
//
//                    || bookingRequest.getCheckInDate().equals(booking.getCheckOutDate())
//                    && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate())
                booking.getCheckOutDate().isAfter(bookingRequest.getCheckInDate()) &&
                bookingRequest.getCheckOutDate().isAfter(booking.getCheckInDate()) &&
                booking.getCheckInDate().isBefore(bookingRequest.getCheckOutDate()) &&
                booking.getCheckOutDate().isAfter(bookingRequest.getCheckInDate()) ||
                bookingRequest.getCheckInDate().isAfter(booking.getCheckInDate()) &&
                bookingRequest.getCheckOutDate().isBefore(booking.getCheckOutDate()) ||
                bookingRequest.getCheckInDate().equals(booking.getCheckInDate()) &&
                bookingRequest.getCheckOutDate().equals(booking.getCheckOutDate())
         );
    }

    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }
}
