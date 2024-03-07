package com.phoebe.campusAccommodation.controller;

import com.phoebe.campusAccommodation.exception.UserAlreadyExistsException;
import com.phoebe.campusAccommodation.model.User;
import com.phoebe.campusAccommodation.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @PostMapping("/register-user")
    public ResponseEntity<?> registerUser(User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("Registration successful!");
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
