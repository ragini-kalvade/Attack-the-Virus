package com.G4.ATV_Backend.service;

import com.G4.ATV_Backend.entities.MyUser;
import org.apache.coyote.BadRequestException;

import java.util.List;
import java.util.Optional;

public interface UserService {
    MyUser registerUser(MyUser myUser);

    List<MyUser> getAllUsers();

    Optional<MyUser> getUserById(int id);

    MyUser updateUser(int id, MyUser myUserDetails);

    void deleteUser(int id);

    MyUser loginUser(MyUser myUser) throws BadRequestException;

    MyUser getUserByUsername(String username);
}
