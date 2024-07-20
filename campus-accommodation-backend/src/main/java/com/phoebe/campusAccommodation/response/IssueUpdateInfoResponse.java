package com.phoebe.campusAccommodation.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IssueUpdateInfoResponse {
    private Long id;
    private String issueDescription;
    private String status;
    private LocalDateTime updatedAt;
}
