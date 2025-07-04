package com.personal.finance.tracker.demo.transaction.web;

import lombok.Data;

@Data
public class UpdateTransactionRequest {
    private double amount;
    private String type;
    private String description;
    private String date;
    private String category;
}
