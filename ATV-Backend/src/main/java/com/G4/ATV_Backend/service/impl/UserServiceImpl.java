package com.G4.ATV_Backend.service.impl;

import com.G4.ATV_Backend.entities.MyUser;
import com.G4.ATV_Backend.repository.UserRepository;
import com.G4.ATV_Backend.service.UserService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    // Add a new user
    public MyUser registerUser(MyUser myUser) {
        return userRepository.save(myUser);
    }

    public MyUser loginUser(MyUser myUser) throws BadRequestException {
        Optional<MyUser> user = userRepository.findByUsername(myUser.getUsername());
        if (user.isPresent()) {
            if (user.get().getPassword().equals(myUser.getPassword())) {
                return user.get();
            }else {
                throw new BadRequestException("Invalid username or password");
            }
        }else {
            throw new BadRequestException("Invalid username or password");
        }
    }

    public MyUser getUserByUsername(String username) {
        Optional<MyUser> myUser = userRepository.findByUsername(username);
        if (myUser.isPresent()) {
            return myUser.get();
        }else {
            throw new RuntimeException("username not found");
        }

    }

    public List<MyUser> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<MyUser> getUserById(int id) {
        return userRepository.findById(id);
    }

    public MyUser updateUser(int id, MyUser myUserDetails) {
        return userRepository.findById(id).map(myUser -> {
            myUser.setRoles(myUserDetails.getRoles());
            myUser.setUsername(myUserDetails.getUsername());
            myUser.setPassword(myUserDetails.getPassword());
            myUser.setFirstName(myUserDetails.getFirstName());
            myUser.setLastName(myUserDetails.getLastName());
            myUser.setPhone(myUserDetails.getPhone());
            return userRepository.save(myUser);
        }).orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Optional<MyUser> user = userRepository.findByUsername(username);
//        if (user.isPresent()) {
//            MyUser currentMyUser = user.get();
//            return User.builder()
//                    .username(currentMyUser.getUsername())
//                    .password(currentMyUser.getPassword())
//                    .roles(getRoles(currentMyUser))
//                    .build();
//        }else {
//            throw new UsernameNotFoundException(username);
//        }
//    }

    private String[] getRoles(MyUser currentMyUser) {
        if(currentMyUser.getRoles()==null) {
            return new String[]{"USER"};
        }
        return currentMyUser.getRoles().split(",");
    }
}
