package com.example.bank_management.service;

import com.example.bank_management.entity.User;
import com.example.bank_management.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register a new user
    public User registerUser(User user) {
        user.setBalance(0.0);  // Initialize balance to 0
        return userRepository.save(user);
    }

    // Login with account number and pin
    public Optional<User> loginUser(String accountNumber, String pin) {
        return userRepository.findByAccountNumberAndPin(accountNumber, pin);
    }
}
