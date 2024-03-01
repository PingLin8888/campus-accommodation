package com.phoebe.campusAccommodation.repository;

import com.phoebe.campusAccommodation.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findByRoomId(Long roomId);

    Booking findByBookingConfirmationCode(String confimationCode);
}
