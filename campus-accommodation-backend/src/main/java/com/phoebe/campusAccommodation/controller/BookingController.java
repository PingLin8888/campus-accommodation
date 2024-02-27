package com.phoebe.campusAccommodation.controller;

import com.phoebe.campusAccommodation.model.Booking;
import com.phoebe.campusAccommodation.response.BookingResponse;
import com.phoebe.campusAccommodation.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    public ResponseEntity<?> getBookingByConfirmationCode(String confimationCode){
        try{
            Booking booking = bookingService.findByBookingConfirmationCode(confimationCode);
            BookingResponse 
        }catch (){

        }
    }


    private BookingResponse getBookingResponse(Booking booking) {
    }
}
