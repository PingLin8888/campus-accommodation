package com.phoebe.campusAccommodation.service;

import com.phoebe.campusAccommodation.exception.UserAlreadyExistsException;
import com.phoebe.campusAccommodation.model.Role;
import com.phoebe.campusAccommodation.model.User;
import com.phoebe.campusAccommodation.repository.RoleRepository;
import com.phoebe.campusAccommodation.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

/*Without this annotation, this will come with this"Could not autowire. No beans of 'UserService' type found. "*/
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    /*Without SecurityConfig, this will come with this"Could not autowire. No beans of 'UserService' type found. */
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public User registerUser(User user) throws UserAlreadyExistsException {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role roleOfUser = roleRepository.findByName("ROLE_USER").get();
        user.setRoles((Collections.singletonList(roleOfUser)));
        return userRepository.save(user);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    /*This means that when this method is invoked, a database transaction will be initiated. If the method completes successfully, the transaction will be committed, and any changes made to the database will be saved permanently. If an exception occurs during the execution of the method, the transaction will be rolled back, and any changes made to the database within the scope of the transaction will be reverted.*/
    @Transactional
    public void deleteUser(String email) {
        User user = getUser(email);
        if (user != null) {
            userRepository.deleteByEmail(email);
        }
    }

    public User getUser(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));

    }
}
