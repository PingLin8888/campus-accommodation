package com.phoebe.campusAccommodation.service;

import com.phoebe.campusAccommodation.exception.ResourceNotFoundException;
import com.phoebe.campusAccommodation.model.*;
import com.phoebe.campusAccommodation.repository.IssueUpdateInfoRepository;
import com.phoebe.campusAccommodation.repository.MaintenanceIssueRepository;
import com.phoebe.campusAccommodation.repository.RoomRepository;
import com.phoebe.campusAccommodation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MaintenanceIssueService {

    private final MaintenanceIssueRepository maintenanceIssueRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final IssueUpdateInfoRepository issueUpdateInfoRepository;


    public MaintenanceIssue logIssue(Long userId, Long roomId, String description) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found."));
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new ResourceNotFoundException("Room not found."));

        MaintenanceIssue issue = new MaintenanceIssue(room, user, description);
        return maintenanceIssueRepository.save(issue);
    }

    public MaintenanceIssue updateIssue(Long issueId,Long userId, IssueStatus issueStatus, String updateDescription) {
        MaintenanceIssue issue = maintenanceIssueRepository.findById(issueId).orElseThrow(() -> new ResourceNotFoundException("Issue not found."));
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found."));
        IssueUpdateInfo updateInfo = new IssueUpdateInfo(updateDescription, issueStatus, user);
        issueUpdateInfoRepository.save(updateInfo);
        issue.addUpdate(updateInfo);
        return maintenanceIssueRepository.save(issue);
    }

    public List<MaintenanceIssue> getIssuesByRoomId(Long roomId) {
        return maintenanceIssueRepository.findByRoomId(roomId);
    }

    public List<MaintenanceIssue> getIssuesByUserId(Long userId) {
        return maintenanceIssueRepository.findByUserId(userId);
    }

    public List<MaintenanceIssue> getIssuesByUserEmail(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
        return maintenanceIssueRepository.findByUserId(user.getId());
    }

    public MaintenanceIssue getIssuesByIssueId(Long issueId) {
        return maintenanceIssueRepository.findById(issueId).orElseThrow(()->new ResourceNotFoundException("Issue not found."));
    }
}
