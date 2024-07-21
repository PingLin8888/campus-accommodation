package com.phoebe.campusAccommodation.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateIssueRequest {
    @NotNull
    private String status;
    @NotNull
    private String updateDescription;
}
