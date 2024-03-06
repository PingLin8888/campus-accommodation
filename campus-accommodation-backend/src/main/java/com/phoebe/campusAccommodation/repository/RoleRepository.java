package com.phoebe.campusAccommodation.repository;

import com.phoebe.campusAccommodation.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String userName);
}
