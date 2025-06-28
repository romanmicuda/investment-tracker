package com.personal.finance.tracker.demo.transaction.logic;

import java.util.UUID;

import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.transaction.data.Transaction;
import com.personal.finance.tracker.demo.transaction.web.bodies.TransactionRequest;

public interface TransactionService {
    /**
     * Service interface for managing transactions.
     */
    Transaction createTransaction(TransactionRequest transaction) throws NotFoundException;

    Transaction getTransactionById(UUID id) throws NotFoundException;

    Transaction updateTransaction(UUID id, Transaction transaction) throws NotFoundException;
    
    void deleteTransaction(UUID id) throws NotFoundException;

}
