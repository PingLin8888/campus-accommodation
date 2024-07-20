package com.phoebe.campusAccommodation.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.phoebe.campusAccommodation.model.Room;
import com.phoebe.campusAccommodation.model.User;
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
    private String description;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


}
