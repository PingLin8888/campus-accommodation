package com.phoebe.campusAccommodation.controller;

import com.phoebe.campusAccommodation.exception.RoleAlreadyExistException;
import com.phoebe.campusAccommodation.model.Role;
import com.phoebe.campusAccommodation.model.User;
import com.phoebe.campusAccommodation.service.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.FOUND;

@RequestMapping("/roles")
@RestController
@AllArgsConstructor
public class RoleController {
    private final RoleService roleService;

    @GetMapping("/all-roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        return new ResponseEntity<>(roleService.getRoles(), FOUND);
    }

    @PostMapping("/create-new-role")
    public ResponseEntity<String> createRole(@RequestBody Role role) {
        try {
            roleService.createRole(role);
            return ResponseEntity.ok("New role created successfully");
        } catch (RoleAlreadyExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{roleId}")
    public void deleteRole(@PathVariable("roleId") Long roleId) {
        roleService.deleteRole(roleId);
    }

    @PostMapping("/remove-all-users-from-role/{roleId}")
    public Role removeAllUsersRole(@PathVariable("roleId") Long roleId) {
        return roleService.removeAllUsersFromRole(roleId);
    }

    @PostMapping("/remove-user-from-role")
    public User removeUserFromRole(@RequestParam("userId") Long userId, @RequestParam("roleId") Long roleId) {
        return roleService.removeUserFromRole(userId, roleId);
    }

    @PostMapping("/assign-user-to-role")
    public User assignUserToRole(@RequestParam("userId") Long userId, @RequestParam("roleId") Long roleId) {
        return roleService.assignRoleToUser(userId, roleId);
    }
}
