package com.phoebe.campusAccommodation.controller;

import com.phoebe.campusAccommodation.model.MaintenanceIssue;
import com.phoebe.campusAccommodation.service.MaintenanceIssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/maintenance")
public class MaintenanceIssueController {
    private final MaintenanceIssueService maintenanceIssueService;

    @PostMapping("/log")
    public ResponseEntity<MaintenanceIssue> logIssue(@RequestParam Long userId, @RequestParam Long roomId, @RequestBody String description) {
        MaintenanceIssue issue = maintenanceIssueService.logIssue(userId, roomId, description);
        return new ResponseEntity<>(issue, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<MaintenanceIssue> updateIssue(@RequestParam Long issueId, @RequestParam String status) {
        MaintenanceIssue issue = maintenanceIssueService.updateIssue(issueId, status);
        return new ResponseEntity<>(issue, HttpStatus.OK);
    }


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
