package com.phoebe.campusAccommodation.repository;

import com.phoebe.campusAccommodation.model.IssueUpdateInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueUpdateInfoRepository extends JpaRepository<IssueUpdateInfo, Long> {

}
