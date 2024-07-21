package com.phoebe.campusAccommodation.controller;

import com.phoebe.campusAccommodation.exception.InvalidIssueLoggingRequestException;
import com.phoebe.campusAccommodation.model.IssueStatus;
import com.phoebe.campusAccommodation.model.IssueUpdateInfo;
import com.phoebe.campusAccommodation.model.MaintenanceIssue;
import com.phoebe.campusAccommodation.request.LogIssueRequest;
import com.phoebe.campusAccommodation.request.UpdateIssueRequest;
import com.phoebe.campusAccommodation.response.IssueResponse;
import com.phoebe.campusAccommodation.response.IssueUpdateInfoResponse;
import com.phoebe.campusAccommodation.service.MaintenanceIssueService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceIssueController {

    @Autowired
    private final MaintenanceIssueService maintenanceIssueService;

    @PostMapping("/log")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> logIssue(@RequestParam Long userId, @RequestParam Long roomId, @RequestBody LogIssueRequest logIssueRequest) {
        try {
            String description = logIssueRequest.getDescription();
            System.out.println("description is : " + description);
            MaintenanceIssue issue = maintenanceIssueService.logIssue(userId, roomId, description);
            return ResponseEntity.ok(issue);
        } catch (InvalidIssueLoggingRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<?> getIssuesByRoom(@PathVariable Long roomId) {
        try {
            List<MaintenanceIssue> issues = maintenanceIssueService.getIssuesByRoomId(roomId);
            List<IssueResponse> issueResponses = new ArrayList<>();
            for (MaintenanceIssue issue : issues) {
                IssueResponse issueResponse = getIssueResponse(issue);
                issueResponses.add(issueResponse);
            }
            return ResponseEntity.ok(issueResponses);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getIssuesByUser(@PathVariable Long userId) {
        try {
            List<MaintenanceIssue> issues = maintenanceIssueService.getIssuesByUserId(userId);
            List<IssueResponse> issueResponses = new ArrayList<>();
            for (MaintenanceIssue issue : issues) {
                IssueResponse issueResponse = getIssueResponse(issue);
                issueResponses.add(issueResponse);
            }
            return ResponseEntity.ok(issueResponses);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PutMapping("/update")
    public ResponseEntity<?> updateIssue(@RequestParam Long issueId, @Valid @RequestBody UpdateIssueRequest updateIssueRequest) {
        IssueStatus issueStatus;
        String updateDescription= updateIssueRequest.getUpdateDescription();;
        try {
            String status = updateIssueRequest.getStatus();
            issueStatus = IssueStatus.valueOf(status.toUpperCase());
            MaintenanceIssue issue = maintenanceIssueService.updateIssue(issueId, issueStatus, updateDescription);
            IssueResponse response = getIssueResponse(issue);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private IssueResponse getIssueResponse(MaintenanceIssue issue) {
        List<IssueUpdateInfoResponse> updatesResponses = new ArrayList<>();
        for (IssueUpdateInfo update : issue.getUpdates()) {
            updatesResponses.add(new IssueUpdateInfoResponse(update.getId(), update.getUpdateDescription(), update.getStatus().toString(), update.getUpdatedAt()));
        }
        return new IssueResponse(issue.getId(), issue.getRoom().getId(), issue.getUser().getId(), issue.getIssueDescription(), issue.getCreatedAt(), updatesResponses);
    }


}
