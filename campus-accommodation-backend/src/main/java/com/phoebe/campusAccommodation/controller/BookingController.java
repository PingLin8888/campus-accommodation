package com.phoebe.campusAccommodation.controller;

import com.phoebe.campusAccommodation.exception.InvalidBookingRequestException;
import com.phoebe.campusAccommodation.exception.ResourceNotFoundException;
import com.phoebe.campusAccommodation.model.Booking;
import com.phoebe.campusAccommodation.model.Room;
import com.phoebe.campusAccommodation.response.BookingResponse;
import com.phoebe.campusAccommodation.response.RoomResponse;
import com.phoebe.campusAccommodation.service.BookingService;
import com.phoebe.campusAccommodation.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/bookings")
public class BookingController {
    @Autowired
    private final BookingService bookingService;
    @Autowired
    private final RoomService roomService;

    @GetMapping("all-bookings")
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (Booking booking : bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confimationCode){
        try{
            Booking booking = bookingService.findByBookingConfirmationCode(confimationCode);
            BookingResponse bookingResponse = getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        }catch (ResourceNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping("/room/{roomId}/bookRoom")
    public ResponseEntity<?> saveBooking(@PathVariable long roomId, @RequestBody Booking bookingRequest) {
        try{
            String confirmationCode = bookingService.saveBooking(roomId, bookingRequest);
            return ResponseEntity.ok("Room was booked successfully! Your booking confirmation code is: " + confirmationCode);
        }catch (InvalidBookingRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId){
        bookingService.cancelBooking(bookingId);
    }

    private BookingResponse getBookingResponse(Booking booking) {
        Room theRoom = roomService.getRoomById(booking.getRoom().getId()).get();
        RoomResponse room = new RoomResponse(theRoom.getId(), theRoom.getRoomType(), theRoom.getRoomPrice());
        return new BookingResponse(booking.getBookingId(), booking.getCheckInDate(), booking.getCheckOutDate(),
                booking.getGuestName(), booking.getGuestEmail(), booking.getNumberOfAdults(), booking.getNumberOfChildren(),
                booking.getTotalNumberOfGuest(), booking.getBookingConfirmationCode(), room);

    }
}
