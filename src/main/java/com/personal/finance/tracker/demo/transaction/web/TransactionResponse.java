package com.personal.finance.tracker.demo.transaction.web;

import java.time.LocalDate;
import java.util.UUID;

import com.personal.finance.tracker.demo.category.web.bodies.CategoryResponse;
import com.personal.finance.tracker.demo.transaction.data.Transaction;

import lombok.Data;

@Data
public class TransactionResponse {
    private UUID id;
    private double amount;

    private String type;

    private String description;

    private LocalDate date;

    private String category;

    public static TransactionResponse fromTransaction(Transaction transaction) {
        TransactionResponse response = new TransactionResponse();
        response.setId(transaction.getId());
        response.setAmount(transaction.getAmount());
        response.setType(transaction.getType().name());
        response.setDescription(transaction.getDescription());
        response.setDate(transaction.getDate());
        response.setCategory(transaction.getCategory() != null ? transaction.getCategory().getName() : null);
        return response;
    }
}
