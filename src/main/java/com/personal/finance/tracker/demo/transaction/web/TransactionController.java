package com.personal.finance.tracker.demo.transaction.web;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.checkerframework.checker.units.qual.C;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.personal.finance.tracker.demo.appUser.data.AppUser;
import com.personal.finance.tracker.demo.appUser.logic.UserProviderService;
import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.transaction.data.Transaction;
import com.personal.finance.tracker.demo.transaction.logic.TransactionService;
import com.personal.finance.tracker.demo.transaction.web.bodies.PredicateReqeust;
import com.personal.finance.tracker.demo.transaction.web.bodies.TransactionCreateRequest;


import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("api/transaction")
public class TransactionController {

    private final TransactionService transactionService;
    private final UserProviderService userProviderService;

    @Autowired
    public TransactionController(TransactionService transactionService, UserProviderService userProviderService) {
        this.transactionService = transactionService;
        this.userProviderService = userProviderService;
    }

    @PostMapping    
    public ResponseEntity<Transaction> createTransaction(@RequestBody TransactionCreateRequest transaction) throws NotFoundException {
        AppUser appUser = userProviderService.getCurrentUser()
                .orElseThrow(() -> new NotFoundException("User not found"));
        return ResponseEntity.ok(transactionService.createTransaction(transaction, appUser));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable UUID id) throws NotFoundException {
        return ResponseEntity.ok(transactionService.getTransactionById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable UUID id, @RequestBody Transaction transaction) throws NotFoundException {
        return ResponseEntity.ok(transactionService.updateTransaction(id, transaction));
    }

    @GetMapping("/all")
    public ResponseEntity<List<TransactionResponse>> getAllTransactions() throws NotFoundException {
        AppUser appUser = userProviderService.getCurrentUser()
                .orElseThrow(() -> new NotFoundException("User not found"));
        List<Transaction> transactions = transactionService.getAllTransactions(appUser);
        return ResponseEntity.ok(transactions.stream().map(TransactionResponse::fromTransaction).collect(Collectors.toList()));
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable UUID id) throws NotFoundException {
        transactionService.deleteTransaction(id);
    }
    
}
