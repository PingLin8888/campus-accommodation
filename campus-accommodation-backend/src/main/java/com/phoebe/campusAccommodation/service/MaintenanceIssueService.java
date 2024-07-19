package com.phoebe.campusAccommodation.service;

import com.phoebe.campusAccommodation.exception.ResourceNotFoundException;
import com.phoebe.campusAccommodation.model.MaintenanceIssue;
import com.phoebe.campusAccommodation.model.Room;
import com.phoebe.campusAccommodation.model.User;
import com.phoebe.campusAccommodation.repository.MaintenanceIssueRepository;
import com.phoebe.campusAccommodation.repository.RoomRepository;
import com.phoebe.campusAccommodation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MaintenanceIssueService {

    @Autowired
    private final MaintenanceIssueRepository maintenanceIssueRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public MaintenanceIssue logIssue(Long userId, Long roomId, String description) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found."));
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new ResourceNotFoundException("Room not found."));

        MaintenanceIssue issue = new MaintenanceIssue();
        issue.setUser(user);
        issue.setRoom(room);
        issue.setDescription(description);
        issue.setCreatedAt(LocalDateTime.now());
        return maintenanceIssueRepository.save(issue);
    }

    public MaintenanceIssue updateIssue(Long issueId, String status) {
        MaintenanceIssue issue = maintenanceIssueRepository.findById(issueId).orElseThrow(() -> new ResourceNotFoundException("Issue not found."));
        issue.setStatus(status);
        issue.setUpdatedAt(LocalDateTime.now());
        return maintenanceIssueRepository.save(issue);
    }

    public List<MaintenanceIssue> getIssuesByRoomId(Long roomId) {
        return maintenanceIssueRepository.findByRoomId(roomId);
    }

    public List<MaintenanceIssue> getIssuesByUserId(Long userId) {
        return maintenanceIssueRepository.findByUserId(userId);
    }

}
