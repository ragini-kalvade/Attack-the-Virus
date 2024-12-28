package com.G4.ATV_Backend.controller;

import com.G4.ATV_Backend.entities.MyUser;
import com.G4.ATV_Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserService userService;

//    @PostMapping(value = "/user")
//    public ResponseEntity<MyUser> addUser(@RequestBody MyUser myUser) {
//        MyUser newMyUser = userService.addUser(myUser);
//        return ResponseEntity.ok(newMyUser);
//        //TODO: Error on duplicate username or email
//    }

}
