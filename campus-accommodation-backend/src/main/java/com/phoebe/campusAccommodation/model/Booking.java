package com.phoebe.campusAccommodation.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    @Column(name = "guest_full_name")
    private String guestName;
    @Column(name = "guest_email")
    private String guestEmail;
    @Column(name = "num_of_adults")
    private int numberOfAdults;
    @Column(name = "num_of_children")
    private int numberOfChildren;
    @Column(name = "total_num_of_guest")
    private int totalNumberOfGuest;
    private String bookingConfirmationCode;
    @ManyToOne(fetch = FetchType.LAZY)//one room can have many booking history
    @JoinColumn(name = "room_id")
    private Room room;

    public void calculateTotalGuests(){
        this.totalNumberOfGuest = this.numberOfAdults + this.numberOfChildren;
    }

    public void setNumberOfAdults(int numOfAdults) {
        this.numberOfAdults = numOfAdults;
        calculateTotalGuests();
    }

    public void setNumberOfChildren(int numOfChildren) {
        this.numberOfChildren = numOfChildren;
        calculateTotalGuests();
    }

    public void setBookingConfirmationCode(String bookingConfirmationCode) {
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}
