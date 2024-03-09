package com.phoebe.campusAccommodation.service;

import com.phoebe.campusAccommodation.exception.RoleAlreadyExistException;
import com.phoebe.campusAccommodation.exception.UserAlreadyExistsException;
import com.phoebe.campusAccommodation.model.Role;
import com.phoebe.campusAccommodation.model.User;
import com.phoebe.campusAccommodation.repository.RoleRepository;
import com.phoebe.campusAccommodation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    public Role createRole(Role theRole) {
        String roleName = "ROLE_" + theRole.getName().toUpperCase();
        if (roleRepository.existsByName(roleName)) {
            throw new RoleAlreadyExistException(roleName + " role already exists.");
        }
        Role role = new Role(roleName);
        return roleRepository.save(role);
    }

    public void deleteRole(Long roleId) {
        this.removeAllUsersFromRole(roleId);
        roleRepository.deleteById(roleId);
    }

    public Role findByName(String name) {
        return roleRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Role with name " + name + " not found"));
    }

    public User removeUserFromRole(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);
        if (role.isPresent() && role.get().getUsers().contains(user.get())) {
            role.get().removeUserFromRole(user.get());
            roleRepository.save(role.get());
            return user.get();
        }
        throw new UsernameNotFoundException("User not found");
    }


    public User assignRoleToUser(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);
        if (user.isPresent() && user.get().getRoles().contains(role.get())) {
            throw new UserAlreadyExistsException(user.get().getFirstName() + " is already assigned to the " + role.get().getName() + " role");
        }
        if (role.isPresent()) {
            role.get().assignRoleToUser(user.get());
            roleRepository.save(role.get());
        }
        return user.get();
    }

    public Role removeAllUsersFromRole(Long roleId) {
        Optional<Role> role = roleRepository.findById(roleId);
        role.get().removeAllUsersFromRole();
        return roleRepository.save(role.get());
    }
    
}
