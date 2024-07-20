package com.phoebe.campusAccommodation.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IssueResponse {

    private Long id;
    private Long roomId;
    private Long userId;
    private String issueDescription;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


}
