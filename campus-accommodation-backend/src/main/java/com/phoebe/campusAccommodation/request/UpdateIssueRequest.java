package com.phoebe.campusAccommodation.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateIssueRequest {
    private String status;
    private String updateDescription;
}
