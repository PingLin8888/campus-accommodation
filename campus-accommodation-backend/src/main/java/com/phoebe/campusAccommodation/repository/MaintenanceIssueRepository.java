package com.phoebe.campusAccommodation.repository;


import com.phoebe.campusAccommodation.model.MaintenanceIssue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaintenanceIssueRepository extends JpaRepository<MaintenanceIssue, Long> {
    List<MaintenanceIssue> findByRoomId(Long roomId);

    List<MaintenanceIssue> findByUserId(Long userId);

}
