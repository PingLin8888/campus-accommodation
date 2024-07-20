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

    @ManyToOne
    @JoinColumn(name = "maintenance_issue_id", nullable = false)
    private MaintenanceIssue maintenanceIssue;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private IssueStatus status = IssueStatus.LOGGED;


    public IssueUpdateInfo(Long id, MaintenanceIssue maintenanceIssue, String description, IssueStatus status) {
        this.id = id;
        this.maintenanceIssue = maintenanceIssue;
        this.description = description;
        this.status = status;
        updatedAt = LocalDateTime.now();
    }
}
