package com.phoebe.campusAccommodation.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @ManyToOne
    @JsonManagedReference
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "issue_description",nullable = false)
    private String issueDescription;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private IssueStatus status = IssueStatus.LOGGED;

    @OneToMany
    private List<IssueUpdateInfo> updates = new ArrayList<>();

    @Column
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;


    public MaintenanceIssue(Room room, User user, String issueDescription) {
        this.room = room;
        this.user = user;
        this.issueDescription = issueDescription;
        this.setCreatedAt(LocalDateTime.now());
    }

    public void addUpdate(IssueUpdateInfo update) {
        updates.add(update);
        this.status = update.getStatus();  // Update the status to match the latest update status
    }

}
