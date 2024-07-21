package com.phoebe.campusAccommodation.service;

import com.phoebe.campusAccommodation.exception.ResourceNotFoundException;
import com.phoebe.campusAccommodation.model.*;
import com.phoebe.campusAccommodation.repository.IssueUpdateInfoRepository;
import com.phoebe.campusAccommodation.repository.MaintenanceIssueRepository;
import com.phoebe.campusAccommodation.repository.RoomRepository;
import com.phoebe.campusAccommodation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MaintenanceIssueService {

    @Autowired
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

}
