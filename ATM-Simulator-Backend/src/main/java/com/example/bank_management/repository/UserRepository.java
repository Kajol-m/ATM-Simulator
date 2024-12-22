package com.example.bank_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bank_management.entity.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByAccountNumberAndPin(String accountNumber, String pin);
    Optional<User> findByAccountNumber(String accountNumber);
}
