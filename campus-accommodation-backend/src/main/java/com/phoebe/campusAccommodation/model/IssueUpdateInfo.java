package com.phoebe.campusAccommodation.model;

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
public class IssueUpdateInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String updateDescription;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private IssueStatus status = IssueStatus.LOGGED;


    public IssueUpdateInfo( String description, IssueStatus status) {
        this.updateDescription = description;
        this.status = status;
        updatedAt = LocalDateTime.now();
    }
}
