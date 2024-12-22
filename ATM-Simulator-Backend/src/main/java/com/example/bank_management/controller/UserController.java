package com.example.bank_management.controller;

import com.example.bank_management.service.UserService;
import com.example.bank_management.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public User login(@RequestBody Map<String, String> credentials) {
        String accountNumber = credentials.get("accountNumber");
        String pin = credentials.get("pin");

        return userService.loginUser(accountNumber, pin)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }
}
