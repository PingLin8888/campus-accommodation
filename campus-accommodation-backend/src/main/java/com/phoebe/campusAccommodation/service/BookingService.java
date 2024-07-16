package com.phoebe.campusAccommodation.service;

import com.phoebe.campusAccommodation.exception.InvalidBookingRequestException;
import com.phoebe.campusAccommodation.exception.ResourceNotFoundException;
import com.phoebe.campusAccommodation.model.Booking;
import com.phoebe.campusAccommodation.model.Room;
import com.phoebe.campusAccommodation.repository.BookingRepository;
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
    /*order Room objects based on the value returned by their getRoomPrice method, in ascending order by default.*/
    private final PriorityQueue<Room> minPriceHeap = new PriorityQueue<>(Comparator.comparing(Room::getRoomPrice));
    private final PriorityQueue<Room> maxDemandHeap = new PriorityQueue<>(Comparator.comparing(Room::getDemand).reversed());

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
            updateHeaps(room);
        } else {
            throw new InvalidBookingRequestException("Sorry. This room is not available for the selected dates.");
        }
        return bookingRequest.getBookingConfirmationCode();
    }

    private void updateHeaps(Room room) {
        minPriceHeap.remove(room);
        maxDemandHeap.remove(room);

        // Update room price based on demand (example logic)
        BigDecimal newPrice = room.getRoomPrice().multiply(BigDecimal.valueOf(1 + 0.1 * room.getDemand()));
        room.updateCurrentPrice(newPrice);
        minPriceHeap.add(room);
        maxDemandHeap.add(room);
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
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new ResourceNotFoundException("Booking not found."));
        Room room = booking.getRoom();
        room.removeBooking(booking);
        bookingRepository.deleteById(bookingId);
        updateHeaps(room);
    }

    public List<Booking> getBookingsByUserEmail(String email) {
        return bookingRepository.findByGuestEmail(email);
    }

    public Room getCheapestAvailableRoom() {
        return minPriceHeap.peek();
    }

    public Room getMostInDemandRoom() {
        return maxDemandHeap.peek();
    }
}
