package com.phoebe.campusAccommodation.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
import java.util.Objects;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomType;
    private BigDecimal basePrice;
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
        BigDecimal demandFactor = BigDecimal.valueOf(1 + 0.1 * this.demand);
        BigDecimal newPrice = basePrice.multiply(demandFactor);
        this.setRoomPrice(newPrice);
    }

    public void increaseDemand(){
        this.demand++;
        adjustPriceBasedOnDemand();
    }

    public void decreaseDemand(){
        if (this.demand > 0) {
            this.demand--;
        }
        adjustPriceBasedOnDemand();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Room room = (Room) o;
        return Objects.equals(id, room.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
