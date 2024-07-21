package com.phoebe.campusAccommodation.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IssueResponse {

    private Long id;
    private Long roomId;
    private Long userId;
    private String issueDescription;
    private LocalDateTime createdAt;
    private String status;
    private List<IssueUpdateInfoResponse> updatesResponses;

}
