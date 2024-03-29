package com.phoebe.campusAccommodation.controller;

import com.phoebe.campusAccommodation.exception.UserAlreadyExistsException;
import com.phoebe.campusAccommodation.model.User;
import com.phoebe.campusAccommodation.request.LoginRequest;
import com.phoebe.campusAccommodation.response.JwtResponse;
import com.phoebe.campusAccommodation.security.jwt.JwtUtils;
import com.phoebe.campusAccommodation.security.user.AccommodationUserDetails;
import com.phoebe.campusAccommodation.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = "*")
@RequestMapping("/auth")
@RequiredArgsConstructor
@Getter
@Setter
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    //Works through postMan.
    @PostMapping("/register-user")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {//if missing this annotation,this method can't map the JSON data from the request body to the User object, which ends with user object not null but name and other fields are null.
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("Registration successful!");
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    //Works through postMan.
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtTokenForUser(authentication);
        AccommodationUserDetails userDetails = (AccommodationUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        return ResponseEntity.ok(new JwtResponse(userDetails.getId(), userDetails.getEmail(), jwt, roles));

    }


}
