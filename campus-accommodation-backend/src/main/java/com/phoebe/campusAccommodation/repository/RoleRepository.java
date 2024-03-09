package com.phoebe.campusAccommodation.repository;

import com.phoebe.campusAccommodation.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String userName);

    boolean existsByName(String roleName);
}
