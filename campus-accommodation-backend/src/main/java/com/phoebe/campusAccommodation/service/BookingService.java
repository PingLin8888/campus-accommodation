package com.phoebe.campusAccommodation.service;

import com.phoebe.campusAccommodation.exception.InvalidBookingRequestException;
import com.phoebe.campusAccommodation.exception.ResourceNotFoundException;
import com.phoebe.campusAccommodation.model.Booking;
import com.phoebe.campusAccommodation.model.Room;
import com.phoebe.campusAccommodation.repository.BookingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.PriorityQueue;

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

    @Transactional
    public String saveBooking(long roomId, Booking bookingRequest) {
        if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
            throw new InvalidBookingRequestException("Check-in date must come before check-out date");
        }
        Room room = roomService.getRoomById(roomId).get();
        boolean roomIsAvailable = room.isAvailable(bookingRequest.getCheckInDate(), bookingRequest.getCheckOutDate());
        if (roomIsAvailable) {
            room.addBooking(bookingRequest);
            bookingRepository.save(bookingRequest);
            room.increaseDemand();
        } else {
            throw new InvalidBookingRequestException("Sorry. This room is not available for the selected dates.");
        }
        return bookingRequest.getBookingConfirmationCode();
    }

    @Transactional
    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new ResourceNotFoundException("Booking not found."));
        Room room = booking.getRoom();
        room.removeBooking(booking);
        bookingRepository.deleteById(bookingId);
        room.decreaseDemand();
    }

    public List<Booking> getBookingsByUserEmail(String email) {
        return bookingRepository.findByGuestEmail(email);
    }

    public Room getCheapestAvailableRoom() {
        return roomService.getCheapestAvailableRoom();
    }

    public Room getMostInDemandRoom() {
        return roomService.getMostInDemandRoom();
    }
}
