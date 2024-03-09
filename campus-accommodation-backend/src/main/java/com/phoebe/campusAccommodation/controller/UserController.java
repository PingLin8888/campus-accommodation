package com.phoebe.campusAccommodation.controller;

import com.phoebe.campusAccommodation.model.User;
import com.phoebe.campusAccommodation.service.UserService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<User>> getUser() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.FOUND);
    }

    @GetMapping("/{email}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email) {
        try {
            User user = userService.getUser(email);
            return ResponseEntity.ok(user);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body((e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching user");
        }
    }

    //Works through postMan.
    @DeleteMapping("/delete/{userId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') and #email==principal.username")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") String email) {
        try {
            userService.deleteUser(email);
            return ResponseEntity.ok("User deleted successfully");
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user");
        }

    }
}
