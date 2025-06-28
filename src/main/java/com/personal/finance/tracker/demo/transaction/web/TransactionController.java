package com.personal.finance.tracker.demo.transaction.web;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
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
    public Transaction createTransaction(@RequestBody TransactionCreateRequest transaction) throws NotFoundException {
        AppUser appUser = userProviderService.getCurrentUser()
                .orElseThrow(() -> new NotFoundException("User not found"));
        return transactionService.createTransaction(transaction, appUser);
    }

    @GetMapping("/{id}")
    public Transaction getTransactionById(@PathVariable UUID id) throws NotFoundException {
        return transactionService.getTransactionById(id);
    }

    @PutMapping("/{id}")
    public Transaction updateTransaction(@PathVariable UUID id, @RequestBody Transaction transaction) throws NotFoundException {
        return transactionService.updateTransaction(id, transaction);
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable UUID id) throws NotFoundException {
        transactionService.deleteTransaction(id);
    }
    
}
