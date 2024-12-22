package com.example.bank_management.service;

import com.example.bank_management.entity.Transaction;
import com.example.bank_management.entity.User;
import com.example.bank_management.repository.TransactionRepository;
import com.example.bank_management.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    // Add money to user's balance
    public void addMoney(String accountNumber, Double amount) {
        User user = userRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("User  not found"));

        user.setBalance(user.getBalance() + amount);
        userRepository.save(user);

        // Save transaction record
        saveTransaction(accountNumber, "ADD", amount);
    }

    // Transfer money from one account to another
    public void transferMoney(String fromAccount, String toAccount, Double amount) {
        User sender = userRepository.findByAccountNumber(fromAccount)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        User receiver = userRepository.findByAccountNumber(toAccount)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        if (sender.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance");
        }

        sender.setBalance(sender.getBalance() - amount);
        receiver.setBalance(receiver.getBalance() + amount);

        userRepository.save(sender);
        userRepository.save(receiver);

        // Save transaction records for both sender and receiver
        saveTransaction(fromAccount, "TRANSFER", amount);
        saveTransaction(toAccount, "TRANSFER", amount);
    }

    // Withdraw money from user's balance
    public void withdrawMoney(String accountNumber, Double amount) {
        User user = userRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("User  not found"));

        if (amount <= 0) {
            throw new RuntimeException("Withdrawal amount must be positive");
        }

        if (user.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance");
        }

        user.setBalance(user.getBalance() - amount);
        userRepository.save(user);

        // Save transaction record
        saveTransaction(accountNumber, "WITHDRAW", amount);
    }

    // Save transaction record
    public void saveTransaction(String accountNumber, String type, Double amount) {
        Transaction transaction = new Transaction();
        transaction.setAccountNumber(accountNumber);
        transaction.setType(type);
        transaction.setAmount(amount);
        transaction.setTimestamp(LocalDateTime.now().toString());

        transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionHistory(String accountNumber) {
        return transactionRepository.findByAccountNumber(accountNumber);
    }
}