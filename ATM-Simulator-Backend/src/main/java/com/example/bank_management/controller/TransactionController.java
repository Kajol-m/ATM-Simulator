package com.example.bank_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.bank_management.entity.Transaction;
import com.example.bank_management.entity.User;
import com.example.bank_management.repository.UserRepository;
import com.example.bank_management.service.TransactionService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private UserRepository userRepository;  // Injecting UserRepository to fetch user data

    @PostMapping("/deposit")
    public ResponseEntity<String> addMoney(@RequestBody Map<String, Object> request) {
        String accountNumber = (String) request.get("accountNumber");
        Object amountObj = request.get("amount");
        Double amount;

        // Check the type of amountObj and convert it to Double
        if (amountObj instanceof Integer) {
            amount = ((Integer) amountObj).doubleValue();
        } else if (amountObj instanceof Double) {
            amount = (Double) amountObj;
        } else {
            return ResponseEntity.badRequest().body("Invalid amount type");
        }

        transactionService.addMoney(accountNumber, amount);
        return ResponseEntity.ok("Money added successfully");
    }

    @PostMapping("/transfer")
    public ResponseEntity<String> transferMoney(@RequestBody Map<String, Object> request) {
        String fromAccount = (String) request.get("fromAccount");
        String toAccount = (String) request.get("toAccount");
        Object amountObj = request.get("amount");
        Double amount;

        // Check the type of amountObj and convert it to Double
        if (amountObj instanceof Integer) {
            amount = ((Integer) amountObj).doubleValue();
        } else if (amountObj instanceof Double) {
            amount = (Double) amountObj;
        } else {
            return ResponseEntity.badRequest().body("Invalid amount type");
        }

        try {
            transactionService.transferMoney(fromAccount, toAccount, amount);
            return ResponseEntity.ok("Money transferred successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/withdraw")
    public ResponseEntity<String> withdrawMoney(@RequestBody Map<String, Object> request) {
        String accountNumber = (String) request.get("accountNumber");
        Object amountObj = request.get("amount");
        Double amount;

        // Check the type of amountObj and convert it to Double
        if (amountObj instanceof Integer) {
            amount = ((Integer) amountObj).doubleValue();
        } else if (amountObj instanceof Double) {
            amount = (Double) amountObj;
        } else {
            return ResponseEntity.badRequest().body("Invalid amount type");
        }

        try {
            transactionService.withdrawMoney(accountNumber, amount);
            return ResponseEntity.ok("Money withdrawn successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/history/{accountNumber}")
    public ResponseEntity<Map<String, Object>> getTransactionHistory(@PathVariable String accountNumber) {
        Map<String, Object> response = new HashMap<>();

        // Fetch all transactions for the given account number
        List<Transaction> transactions = transactionService.getTransactionHistory(accountNumber);

        // Fetch user's current balance using UserRepository
        User user = userRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("User not found"));

        response.put("balance", user.getBalance());
        response.put("transactions", transactions);

        return ResponseEntity.ok(response);
    }
}
