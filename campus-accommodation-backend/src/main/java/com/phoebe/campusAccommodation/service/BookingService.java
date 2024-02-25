package com.phoebe.campusAccommodation.service;

import com.phoebe.campusAccommodation.model.Booking;
import com.phoebe.campusAccommodation.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;

    public List<Booking> getAllBookingsByRoomId(Long id) {
        return null;
    }
}
