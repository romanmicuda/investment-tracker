package com.personal.finance.tracker.demo.transaction.logic;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.stereotype.Service;

import com.personal.finance.tracker.demo.appUser.data.AppUser;
import com.personal.finance.tracker.demo.appUser.logic.UserProviderService;
import com.personal.finance.tracker.demo.category.data.Category;
import com.personal.finance.tracker.demo.category.logic.CategoryService;
import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.transaction.data.Transaction;
import com.personal.finance.tracker.demo.transaction.data.TransactionRepository;
import com.personal.finance.tracker.demo.transaction.web.bodies.TransactionRequest;
import com.personal.finance.tracker.demo.transactionType.model.TransactionType;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final CategoryService categoryService;  
    
    public TransactionServiceImpl(TransactionRepository transactionRepository, CategoryService categoryService) {
        this.transactionRepository = transactionRepository;
        this.categoryService = categoryService;
    }

    @Override
    public Transaction createTransaction(TransactionRequest transaction, AppUser appUser) throws NotFoundException {
        Transaction newTransaction = new Transaction();
        newTransaction.setAmount(transaction.getAmount());
        newTransaction.setType(TransactionType.valueOf(transaction.getType().toUpperCase()));
        newTransaction.setDescription(transaction.getDescription());
        newTransaction.setDate(transaction.getDate());
        newTransaction.setUser(appUser);
        Category category = categoryService.getCategoryByName(transaction.getCategory(),appUser);
        newTransaction.setCategory(category);
        return transactionRepository.save(newTransaction);
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
