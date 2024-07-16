package com.phoebe.campusAccommodation.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;

import java.math.BigDecimal;
import java.sql.Blob;
import java.time.LocalDate;
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
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//If the room is deleted, the booking will be gone too.
    private List<Booking> bookings;
    @Lob
    private Blob photo;

    public Room() {
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

    public boolean isAvailable(LocalDate checkInDate, LocalDate checkOutDate) {
        for (Booking booking : bookings) {
            if (booking.getCheckOutDate().isAfter(checkInDate) && booking.getCheckInDate().isBefore(checkOutDate)) {
                return false;
            }
        }
        return true;
    }

    public boolean isAvailable() {
        return bookings.stream().noneMatch(booking -> {
            LocalDate today = LocalDate.now();
            return booking.getCheckOutDate().isAfter(today) && booking.getCheckInDate().isBefore(today);
        });
    }

    public void adjustPriceBasedOnDemand() {
        BigDecimal newPrice = this.getRoomPrice().multiply(BigDecimal.valueOf(1 + 0.1 * this.getDemand()));
        this.roomPrice = newPrice;
    }

    public int getDemand(){
        return this.bookings.size();
    }
}
