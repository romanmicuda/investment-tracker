package com.personal.finance.tracker.demo.transaction.logic;

import java.util.UUID;

import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.transaction.data.Transaction;

public interface TransactionService {
    /**
     * Service interface for managing transactions.
     */
    Transaction createTransaction(Transaction transaction);

    Transaction getTransactionById(UUID id) throws NotFoundException;

    Transaction updateTransaction(UUID id, Transaction transaction) throws NotFoundException;
    
    void deleteTransaction(UUID id) throws NotFoundException;

}
