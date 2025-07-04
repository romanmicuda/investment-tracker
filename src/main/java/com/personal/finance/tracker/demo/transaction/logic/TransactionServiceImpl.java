package com.personal.finance.tracker.demo.transaction.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.personal.finance.tracker.demo.category.data.Category;
import com.personal.finance.tracker.demo.category.logic.CategoryService;
import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.transaction.data.Transaction;
import com.personal.finance.tracker.demo.transaction.data.TransactionRepository;
import com.personal.finance.tracker.demo.transaction.data.TransactionType;
import com.personal.finance.tracker.demo.transaction.web.UpdateTransactionRequest;
import com.personal.finance.tracker.demo.transaction.web.bodies.TransactionCreateRequest;
import com.personal.finance.tracker.demo.user.data.User;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final CategoryService categoryService;  
    
    public TransactionServiceImpl(TransactionRepository transactionRepository, CategoryService categoryService) {
        this.transactionRepository = transactionRepository;
        this.categoryService = categoryService;
    }

    @Override
    public Transaction createTransaction(TransactionCreateRequest transaction, User appUser) throws NotFoundException {
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
    public Transaction updateTransaction(UUID id, UpdateTransactionRequest transaction) throws NotFoundException {
        if (!transactionRepository.existsById(id)) {
            throw new NotFoundException("Transaction with id " + id + " not found");
        }
        Transaction existingTransaction = transactionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Transaction with id " + id + " not found"));
        existingTransaction.setAmount(transaction.getAmount());
        existingTransaction.setType(TransactionType.valueOf(transaction.getType().toUpperCase()));
        existingTransaction.setDescription(transaction.getDescription());
        existingTransaction.setDate(java.time.LocalDate.parse(transaction.getDate()));
        Category category = categoryService.getCategoryByName(transaction.getCategory(), existingTransaction.getUser());
        existingTransaction.setCategory(category);
        return transactionRepository.save(existingTransaction);
    }

    @Override
    public void deleteTransaction(UUID id) throws NotFoundException {
        if (!transactionRepository.existsById(id)) {
            throw new NotFoundException("Transaction with id " + id + " not found");
        }
        transactionRepository.deleteById(id);
    }

    @Override
    public List<Transaction> getAllTransactions(User appUser) throws NotFoundException {
        List<Transaction> transactions = transactionRepository.findAllByUser(appUser);
        if (transactions.isEmpty()) {
            return new ArrayList<>();
        }
        return transactions;
    }


}
