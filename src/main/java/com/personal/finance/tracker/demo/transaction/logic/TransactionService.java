package com.personal.finance.tracker.demo.transaction.logic;

import java.util.List;
import java.util.UUID;

import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.transaction.data.Transaction;
import com.personal.finance.tracker.demo.transaction.web.UpdateTransactionRequest;
import com.personal.finance.tracker.demo.transaction.web.bodies.TransactionCreateRequest;
import com.personal.finance.tracker.demo.user.data.User;

public interface TransactionService {
    /**
     * Service interface for managing transactions.
     */
    Transaction createTransaction(TransactionCreateRequest transactio, User appUser) throws NotFoundException;

    Transaction getTransactionById(UUID id) throws NotFoundException;

    Transaction updateTransaction(UUID id, UpdateTransactionRequest transaction) throws NotFoundException;
    
    void deleteTransaction(UUID id) throws NotFoundException;

    List<Transaction> getAllTransactions(User appUser) throws NotFoundException;

}
