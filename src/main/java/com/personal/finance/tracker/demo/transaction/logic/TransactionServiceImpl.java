package com.personal.finance.tracker.demo.transaction.logic;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.transaction.data.Transaction;
import com.personal.finance.tracker.demo.transaction.data.TransactionRepository;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionServiceImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Override
    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public Transaction getTransactionById(UUID id) throws NotFoundException {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Transaction with id " + id + " not found"));
    }

    @Override
    public Transaction updateTransaction(UUID id, Transaction transaction) throws NotFoundException {
        if (!transactionRepository.existsById(id)) {
            throw new NotFoundException("Transaction with id " + id + " not found");
        }
        transaction.setId(id);
        return transactionRepository.save(transaction);
    }

    @Override
    public void deleteTransaction(UUID id) throws NotFoundException {
        if (!transactionRepository.existsById(id)) {
            throw new NotFoundException("Transaction with id " + id + " not found");
        }
        transactionRepository.deleteById(id);
    }

}
