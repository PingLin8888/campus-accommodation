package com.phoebe.campusAccommodation.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MaintenanceIssue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "room_id",nullable = false)
    @JsonManagedReference
    private Room room;
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "user_id",nullable = false)
    private User user;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private String status = "Logged";
    @Column
    private LocalDateTime createdAt;
    @Column
    private LocalDateTime updatedAt;
}
