package com.phoebe.campusAccommodation.controller;

import com.phoebe.campusAccommodation.exception.InvalidIssueLoggingRequestException;
import com.phoebe.campusAccommodation.exception.ResourceNotFoundException;
import com.phoebe.campusAccommodation.model.MaintenanceIssue;
import com.phoebe.campusAccommodation.model.Room;
import com.phoebe.campusAccommodation.request.LogIssueRequest;
import com.phoebe.campusAccommodation.response.IssueResponse;
import com.phoebe.campusAccommodation.service.MaintenanceIssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
            MaintenanceIssue issue = maintenanceIssueService.logIssue(userId, roomId, description);
            return ResponseEntity.ok().body("Issue logged successfully");
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

    private IssueResponse getIssueResponse(MaintenanceIssue issue) {
        return new IssueResponse(issue.getId(),  issue.getDescription(), issue.getStatus(), issue.getCreatedAt(), issue.getUpdatedAt());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MaintenanceIssue>> getIssuesByUser(@PathVariable Long userId) {
        List<MaintenanceIssue> issues = maintenanceIssueService.getIssuesByUserId(userId);
        return new ResponseEntity<>(issues, HttpStatus.OK);
    }


    @PutMapping("/update")
    public ResponseEntity<MaintenanceIssue> updateIssue(@RequestParam Long issueId, @RequestParam String status) {
        MaintenanceIssue issue = maintenanceIssueService.updateIssue(issueId, status);
        return new ResponseEntity<>(issue, HttpStatus.OK);
    }

}
