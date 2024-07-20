package com.phoebe.campusAccommodation.model;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "room_id",nullable = false)
    private Room room;
    @ManyToOne
    @JsonManagedReference
    @JsonIgnore
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
