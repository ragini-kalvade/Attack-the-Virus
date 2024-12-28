package com.G4.ATV_Backend.controller;

import com.G4.ATV_Backend.entities.MyUser;
import com.G4.ATV_Backend.service.UserService;
import jakarta.persistence.Column;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;
//    @Autowired
//    private PasswordEncoder passwordEncoder;

    // Add a new user
    @PostMapping("/register")
    public ResponseEntity<MyUser> registerUser(@RequestBody MyUser myUser) {
//        myUser.setPassword(passwordEncoder.encode(myUser.getPassword()));
        MyUser newMyUser = userService.registerUser(myUser);
        return ResponseEntity.ok(newMyUser);

        //TODO: Error on duplicate username or email
    }

    @PostMapping("/login")
    public ResponseEntity<MyUser> loginUser(@RequestBody MyUser myUser) throws BadRequestException {
//        myUser.setPassword(passwordEncoder.encode(myUser.getPassword()));
        MyUser newMyUser = userService.loginUser(myUser);
        return ResponseEntity.ok(newMyUser);

        //TODO: Error on duplicate username or email
    }

    // Get all users
    @GetMapping("/user")
    public ResponseEntity<List<MyUser>> getAllUsers() {
        List<MyUser> myUsers = userService.getAllUsers();
        return ResponseEntity.ok(myUsers);
    }

    // Get a user by ID
    @GetMapping("/user/{id}")
    public ResponseEntity<MyUser> getUserById(@PathVariable int id) {
        Optional<MyUser> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update a user by ID
    @PutMapping("/user/{id}")
    public ResponseEntity<MyUser> updateUser(@PathVariable int id, @RequestBody MyUser myUserDetails) {
        try {
            MyUser updatedMyUser = userService.updateUser(id, myUserDetails);
            return ResponseEntity.ok(updatedMyUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a user by ID
    @DeleteMapping("/user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
