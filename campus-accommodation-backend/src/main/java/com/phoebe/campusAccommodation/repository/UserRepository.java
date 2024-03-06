package com.phoebe.campusAccommodation.repository;

import com.phoebe.campusAccommodation.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

}
