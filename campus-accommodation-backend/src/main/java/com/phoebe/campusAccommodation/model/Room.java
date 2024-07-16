package com.phoebe.campusAccommodation.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked = false;
    private int demand; // Number of bookings made for this room
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)//If the room is deleted, the booking will be gone too.
    private List<Booking> bookings;
    @Lob
    private Blob photo;

    public Room(){
        this.bookings = new ArrayList<>();
    }

    public synchronized void addBooking(Booking booking) {
        if (this.bookings == null) {
            bookings = new ArrayList<>();
        }
        bookings.add(booking);
        booking.setRoom(this);
        isBooked = true;
        demand++;
        String bookingCode = RandomStringUtils.randomNumeric(10);
        booking.setBookingConfirmationCode(bookingCode);
    }

    public synchronized void removeBooking(Booking booking) {
        if (this.bookings != null) {
            bookings.remove(booking);
            demand--;
            isBooked = bookings.isEmpty() ? false : true;
        }
    }

    public void updateCurrentPrice(BigDecimal newPrice) {
        this.roomPrice = newPrice;
    }

}
