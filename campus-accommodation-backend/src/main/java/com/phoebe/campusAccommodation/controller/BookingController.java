package com.phoebe.campusAccommodation.controller;

import com.phoebe.campusAccommodation.exception.ResourceNotFoundException;
import com.phoebe.campusAccommodation.model.Booking;
import com.phoebe.campusAccommodation.response.BookingResponse;
import com.phoebe.campusAccommodation.service.BookingService;
import lombok.RequiredArgsConstructor;
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
    private final BookingService bookingService;

    @GetMapping("get-all-bookings")
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

    public ResponseEntity<?> saveBooking(@PathVariable long roomId, @RequestBody Booking bookingRequest) {
        try{
            String confirmationCode = bookingService.saveBooking(roomId, bookingRequest);
            
        }catch (){

        }
    }

    private BookingResponse getBookingResponse(Booking booking) {
    }
}
