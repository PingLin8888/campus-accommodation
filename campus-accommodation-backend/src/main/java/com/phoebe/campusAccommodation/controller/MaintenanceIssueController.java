package com.phoebe.campusAccommodation.controller;

import com.phoebe.campusAccommodation.exception.InvalidIssueLoggingRequestException;
import com.phoebe.campusAccommodation.model.MaintenanceIssue;
import com.phoebe.campusAccommodation.service.MaintenanceIssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceIssueController {

    @Autowired
    private final MaintenanceIssueService maintenanceIssueService;

    @PostMapping("/log")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> logIssue(@RequestParam Long userId, @RequestParam Long roomId, @RequestBody String description) {
        try {
            MaintenanceIssue issue = maintenanceIssueService.logIssue(userId, roomId, description);
            return ResponseEntity.ok().body("Issue logged successfully");
        } catch (InvalidIssueLoggingRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PutMapping("/update")
    public ResponseEntity<MaintenanceIssue> updateIssue(@RequestParam Long issueId, @RequestParam String status) {
        MaintenanceIssue issue = maintenanceIssueService.updateIssue(issueId, status);
        return new ResponseEntity<>(issue, HttpStatus.OK);
    }


//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<MaintenanceIssue>> getIssuesByRoom(@PathVariable Long roomId) {
        List<MaintenanceIssue> issues = maintenanceIssueService.getIssuesByRoomId(roomId);
        return new ResponseEntity<>(issues, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MaintenanceIssue>> getIssuesByUser(@PathVariable Long userId) {
        List<MaintenanceIssue> issues = maintenanceIssueService.getIssuesByUserId(userId);
        return new ResponseEntity<>(issues, HttpStatus.OK);
    }
}
